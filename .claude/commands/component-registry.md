# component-registry

Gestiona la memoria de componentes del proyecto.

**Un componente global se usa en más de una pantalla y nunca se implementa dos veces — solo se configuran sus props.**

```bash
/component-registry --search "tabla de datos con filtros"
/component-registry --search "149-66070"
/component-registry --add src/features/catalog/ui/StatusChip.tsx
/component-registry --global src/shared/ui/StatusChip.tsx --tags "chip,estado,badge"
/component-registry --list
/component-registry --list --global
```

---

## Normalización de node-ids (aplica en todos los modos)

Los node-ids de Figma pueden llegar en dos formatos:
- Desde la API: `149:66070` (con dos puntos)
- Desde una URL: `149-66070` (con guión)

**Siempre normalizar a `:` antes de comparar o guardar:**

```javascript
const normalizeNodeId = (id) => id.replace(/-/g, ':');
// "149-66070" → "149:66070"
// "149:66070" → "149:66070" (sin cambio)
```

Aplicar esta normalización en toda búsqueda y al guardar en el registro.

---

## Modo --search

Se llama automáticamente por `/implementar-diseño` antes de crear cualquier componente.

### Búsqueda en 3 capas

**Capa 1 — Node-id exacto:**
Si la query contiene un patrón `\d+[:-]\d+`, extraerlo, normalizarlo a `:` y buscar en `figmaNodes[]` del registro (también normalizados).

```javascript
const queryNodeId = normalizeNodeId(query.match(/\d+[:-]\d+/)?.[0] || '');
const match = Object.values(registry.components)
  .find(c => c.figmaNodes.map(normalizeNodeId).includes(queryNodeId));
```

**Capa 2 — Tags:**
Normalizar la query (minúsculas, sin artículos). Buscar componentes con ≥2 tags en común.

**Capa 3 — Nombre y descripción:**
Coincidencias parciales en `id` y `description`.

### Respuesta

```
=== BÚSQUEDA EN REGISTRO ===

✓ MATCH EXACTO (nodo Figma 149:66070)
  StatusChip
  Path:   src/shared/ui/StatusChip.tsx
  Import: import { StatusChip } from '@/shared/ui/StatusChip'
  Props:  { status: 'active' | 'inactive' | 'pending'; label?: string }
  Global: sí — no implementar de nuevo, solo configurar props
  → REUTILIZAR DIRECTAMENTE

~ SIMILAR (tags: chip, estado)
  BadgeEstado — src/features/users/ui/BadgeEstado.tsx
  → REVISAR SI ES ADAPTABLE

✗ SIN MATCH
  → IMPLEMENTAR DESDE CERO
=== FIN ===
```

---

## Modo --add

Registra un componente.

### Paso 1 — Leer el archivo fuente

```bash
cat {ruta del archivo .tsx}
```

Extraer: nombre del componente, interface de props completa, variantes/estados, dependencias MUI, iconos Tabler.

### Paso 2 — Detectar si debería ser global

```bash
grep -r "{NombreComponente}" src/ --include="*.tsx" -l 2>/dev/null
```

Si aparece en ≥2 archivos distintos → marcarlo como global y notificar:
> 💡 `{NombreComponente}` ya se usa en {N} pantallas. Lo registré como global.

### Paso 3 — Inferir tags

| Contenido del archivo | Tags inferidos |
|----------------------|----------------|
| `DataGrid` | `datagrid`, `tabla`, `lista` |
| `Drawer` | `drawer`, `panel-lateral` |
| `Dialog` | `dialog`, `modal` |
| `Chip` / `Badge` | `chip`, `badge`, `etiqueta` |
| `Select` / `Autocomplete` | `selector`, `dropdown`, `filtro` |
| `TextField` | `input`, `formulario` |
| `Tabs` | `tabs`, `navegacion` |
| `Snackbar` / `Alert` | `notificacion`, `feedback` |
| `Menu` | `menu`, `contextual` |
| `Popover` | `popover`, `tooltip` |

### Paso 4 — Buscar nodos Figma asociados

```bash
grep -rh "node-id=" definitions/figma-pages/ | grep -o "node-id=[^&\"]*" | sed 's/node-id=//'
```

Normalizar todos a `:` antes de guardar en el registro.

### Paso 5 — Escribir en el registro

```json
"{NombreComponente}": {
  "id": "NombreComponente",
  "path": "src/features/{feature}/ui/{Componente}.tsx",
  "importFrom": "@/features/{feature}/ui/{Componente}",
  "description": "Qué hace en una línea",
  "props": "{ prop1: Tipo; prop2?: Tipo }",
  "figmaNodes": ["149:66070"],
  "tags": ["tag1", "tag2"],
  "global": false,
  "usedIn": ["slug-pagina-1"],
  "addedAt": "{ISO_TIMESTAMP}",
  "addedBy": "auto"
}
```

Todos los node-ids guardados en formato `:` (normalizados).

---

## Modo --global

Marca como global. Si no está en el registro: ejecutar `--add` primero.

Si la ruta actual está en `src/features/`, sugerir mover:
> 💡 Los componentes globales deberían vivir en `src/shared/ui/`.
> ¿Quieres que lo mueva a `src/shared/ui/{NombreComponente}.tsx`?
> (Actualizaré los imports automáticamente)

Si confirma:
1. Mover el archivo
2. Actualizar todos los imports con `str_replace`
3. Verificar build: `bun run build 2>&1 | grep -i "cannot find"` → si hay errores, corregirlos
4. Actualizar `"global": true` en el registro

---

## Modo --list

```
=== REGISTRO DE COMPONENTES ===
Total: {N} | Globales: {N} | Solo en feature: {N}

GLOBALES:
  ⬡ StatusChip     [chip, badge, etiqueta]   src/shared/ui/StatusChip.tsx
  ⬡ DataTable      [datagrid, tabla, lista]   src/shared/ui/DataTable.tsx

EN FEATURES:
  · UserDrawer     [drawer, formulario]       src/features/users/ui/UserDrawer.tsx

=== FIN ===
```
