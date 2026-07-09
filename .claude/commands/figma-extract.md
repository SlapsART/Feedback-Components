# figma-extract

Conecta con Figma y genera los archivos de referencia que necesita el resto de comandos.

**Argumentos:** `$ARGUMENTS`
- Arg 1: Tu token de Figma (`figd_...`)
- Arg 2: URL del archivo en Figma
- Flag `--force` (opcional): ignora el caché y vuelve a obtener todo desde Figma

```
/figma-extract figd_abc123... https://www.figma.com/design/KCZP4y7YrW0tqkFqjVijzl/...
/figma-extract figd_abc123... https://... --force   ← usa esto si cambiaste el diseño
```

---

## Paso 0 — Leer configuración del proyecto

```bash
cat definitions/.project-config.json 2>/dev/null || echo "config:FALTA"
```

Si no existe `.project-config.json`:
> ⛔ El proyecto no ha sido configurado. Corre `/iniciar-proyecto` primero.

---

## Paso 1 — Parsear argumentos

Separa `$ARGUMENTS`:
- `FIGMA_TOKEN` = primer argumento
- `INPUT` = segundo argumento
- `FORCE` = true si contiene `--force`

Si `INPUT` contiene `figma.com`: extrae el fileKey del segmento tras `/design/` o `/file/`.
Si no: usar `INPUT` directamente como fileKey.

---

## Paso 2 — Gestión de caché con validación de cambios

```bash
mkdir -p definitions/.figma-cache
CACHE_FILE="definitions/.figma-cache/${FILE_KEY}-meta.json"
```

### Si `--force` está activo:
Eliminar el caché existente y continuar al Paso 3.
```bash
rm -f "$CACHE_FILE"
echo "Caché eliminado. Obteniendo datos frescos de Figma..."
```

### Si el caché existe y tiene menos de 2 horas:
```bash
CACHE_AGE=$(( $(date +%s) - $(stat -f %m "$CACHE_FILE" 2>/dev/null || stat -c %Y "$CACHE_FILE" 2>/dev/null || echo 0) ))
[ "$CACHE_AGE" -lt 7200 ] && echo "cache:vigente" || echo "cache:expirado"
```

Si el caché está vigente, informar:
> Usando datos de Figma guardados hace {X} minutos.
> Si cambiaste el diseño desde entonces, usa el flag `--force` para actualizar:
> `/figma-extract {token} {url} --force`

Continuar al Paso 4 usando el caché.

### Si el caché expiró o no existe: continuar al Paso 3.

---

## Paso 3 — Obtener datos de Figma y validar respuesta

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY?depth=1" \
  -o "$CACHE_FILE" \
  -w "%{http_code}"
```

### Validar que la respuesta sea válida

```bash
node -e "
  const fs = require('fs');
  const raw = fs.readFileSync('$CACHE_FILE', 'utf8');
  let data;
  try { data = JSON.parse(raw); } catch(e) {
    console.log('ERROR:JSON_INVALIDO');
    process.exit(1);
  }
  if (data.status === 403 || data.err) {
    console.log('ERROR:TOKEN_INVALIDO:' + (data.err || 'acceso denegado'));
    process.exit(1);
  }
  if (data.status === 404) {
    console.log('ERROR:ARCHIVO_NO_ENCONTRADO');
    process.exit(1);
  }
  if (!data.document) {
    console.log('ERROR:RESPUESTA_INESPERADA');
    process.exit(1);
  }
  console.log('ok:' + data.name);
"
```

Si la validación falla:
- **Eliminar el caché corrupto** inmediatamente: `rm -f "$CACHE_FILE"`
- Mostrar mensaje claro según el error:

| Error | Mensaje para el diseñador |
|-------|--------------------------|
| `TOKEN_INVALIDO` | Tu token de Figma no es válido o venció. Genera uno nuevo en Figma → Account Settings → Personal Access Tokens. |
| `ARCHIVO_NO_ENCONTRADO` | No se encontró el archivo en Figma. Verifica que la URL sea correcta y que tengas acceso a ese archivo. |
| `JSON_INVALIDO` | La respuesta de Figma fue inesperada. Intenta de nuevo en unos minutos. |
| `RESPUESTA_INESPERADA` | Respuesta inesperada de la API de Figma. Intenta de nuevo. |

En todos los casos de error: **detener el comando**. No continuar con datos inválidos.

---

## Paso 4 — Comparar con extracción anterior (detectar cambios)

Si ya existen archivos `.md` en `definitions/figma-pages/`, verificar si algo cambió en Figma:

```bash
# Obtener el timestamp de última modificación del archivo en Figma
node -e "
  const data = JSON.parse(require('fs').readFileSync('$CACHE_FILE', 'utf8'));
  console.log(data.lastModified || 'desconocido');
"
```

Comparar contra el timestamp guardado en `definitions/figma-pages/_index.json` (campo `extractedAt`).

**Si el timestamp es igual** (el archivo de Figma no cambió desde la última extracción):
> ✓ El archivo de Figma no ha cambiado desde la última extracción ({fecha}).
> Los archivos actuales están al día. No hay nada que actualizar.
> Si quieres forzar una re-extracción de todas formas, usa `--force`.

**Detener aquí** — no regenerar archivos innecesariamente.

**Si el timestamp es diferente** (el archivo cambió):

Identificar exactamente qué cambió comparando los node-ids del caché nuevo vs los guardados en `_index.json`:

```bash
node -e "
  const nuevo = JSON.parse(require('fs').readFileSync('$CACHE_FILE', 'utf8'));
  const index = JSON.parse(require('fs').readFileSync('definitions/figma-pages/_index.json', 'utf8'));
  // Comparar páginas: nuevas, eliminadas, renombradas
  const paginasNuevas = nuevo.document.children.map(p => p.id);
  const paginasAnteriores = index.pages.map(p => p.sectionId);
  const agregadas = paginasNuevas.filter(id => !paginasAnteriores.includes(id));
  const eliminadas = paginasAnteriores.filter(id => !paginasNuevas.includes(id));
  console.log(JSON.stringify({ agregadas, eliminadas }));
"
```

Informar los cambios detectados antes de continuar:
```
⚠ El archivo de Figma cambió desde la última extracción.
  Cambios detectados:
  + {N} sección(es) nueva(s): {nombres}
  - {N} sección(es) eliminada(s): {nombres}
  ~ {N} sección(es) modificada(s): {nombres}

Actualizando solo lo que cambió...
```

Regenerar únicamente los `.md` de las secciones que cambiaron. Las secciones sin cambios no se tocan.

---

## Paso 5 — Explorar páginas del archivo

Para cada página del documento, obtener sus hijos directos:

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/nodes?ids={PAGE_ID}&depth=2"
```

Descartar secciones: `Componentes`, `Components`, `Assets`, `Librería`, `Library`.

Regla: mayoría `SECTION` → secciones son páginas de diseño. Mayoría `FRAME` → frames son páginas. Mezcla → priorizar `SECTION` con nombre significativo.

---

## Paso 6 — Detalle de secciones (máx 5 IDs por llamada)

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/nodes?ids=ID1,ID2,ID3,ID4,ID5" \
  > definitions/.figma-cache/${FILE_KEY}-nodes-batch.json
```

Validar respuesta con el mismo patrón del Paso 3.

### Clasificación de nodos hijos

| Tipo | Clasificación |
|------|---------------|
| `FRAME` sin overlay en nombre | **Frame principal** |
| `INSTANCE`/`FRAME` con `<Dialog>` | **Dialog** |
| `INSTANCE`/`FRAME` con `<Popover>` | **Popover** |
| `INSTANCE`/`FRAME` con `Drawer` o `<Drawer>` | **Drawer** |
| `INSTANCE`/`FRAME` con `<Menu>` | **Menú contextual** |
| `INSTANCE`/`FRAME` con `<Snackbar>` | **Snackbar** |
| `FRAME` con Drawer/Dialog/Popover como hijo directo | **Pantalla de contexto** |
| `SECTION` con nombre `Componente*` | Ignorar |
| `VECTOR`, `TEXT`, `RECTANGLE`, `GROUP` sueltos | Ignorar |

---

## Paso 7 — Generar archivos `.md`

```bash
mkdir -p definitions/figma-pages
```

Nombre del archivo: slug del nombre (minúsculas, espacios→guiones, sin caracteres especiales).
Sobreescribir solo los que cambiaron (identificados en Paso 4).

```markdown
# {Nombre de la sección}

**Sección Figma:** `{Nombre}` (node `{ID}`)

---

## Página principal

| Estado | Link |
|--------|------|
| Vista base — {descripción breve} | {URL} |

---

## Vistas alternativas / estados  ← omitir si no hay

| Estado | Link |
|--------|------|

---

## Elementos complementarios  ← omitir si no hay

### Dialogs
| Descripción | Link |
|-------------|------|

### Drawers — {Nuevo / Editar}
| Descripción | Link |
|-------------|------|

### Popovers
| Descripción | Link |
|-------------|------|

### Menús contextuales
| Descripción | Link |
|-------------|------|

---

## Pantallas de contexto  ← omitir si no hay

| Estado | Link |
|--------|------|
```

Formato de links: `https://www.figma.com/design/{fileKey}/{FILE_NAME}?node-id={NODE-ID}`
`{NODE-ID}`: `:` → `-`. Ej: `149:66070` → `149-66070`

---

## Paso 8 — Generar índice machine-readable

Crear o actualizar `definitions/figma-pages/_index.json`.

Cruzar cada node-id contra `definitions/component-registry.json`.

**Formato normalizado — todos los nodos como objetos, sin tipos mezclados:**

```json
{
  "fileKey": "{FILE_KEY}",
  "figmaLastModified": "{timestamp de lastModified de la API}",
  "extractedAt": "{ISO_TIMESTAMP}",
  "pages": [
    {
      "slug": "{slug}",
      "file": "definitions/figma-pages/{slug}.md",
      "sectionId": "{NODE_ID}",
      "components": {
        "main": [
          {
            "nodeId": "149-66070",
            "registeredComponent": null
          }
        ],
        "dialogs": [
          {
            "nodeId": "149-66071",
            "registeredComponent": {
              "name": "ConfirmDialog",
              "path": "src/shared/ui/ConfirmDialog.tsx",
              "global": true
            }
          }
        ],
        "drawers": [
          { "nodeId": "149-66072", "registeredComponent": null }
        ],
        "popovers": [
          { "nodeId": "149-66073", "registeredComponent": null }
        ],
        "menus": [
          { "nodeId": "149-66074", "registeredComponent": null }
        ],
        "contextScreens": [
          { "nodeId": "149-66075", "registeredComponent": null }
        ]
      }
    }
  ]
}
```

Todos los nodos son objetos con `nodeId` (string) y `registeredComponent` (objeto o `null`).
**Nunca strings planos en los arrays.**

---

## Paso 9 — Confirmar resultado

```bash
ls definitions/figma-pages/
```

Informar:
- Cuántos archivos generados o actualizados
- Cuántos sin cambios (omitidos)
- Cuántos componentes ya tienen match en el registro

Siguiente paso:
> ✓ Extracción completa. Corre: `/loop-implementar definitions/figma-pages/{primer-slug}.md`
