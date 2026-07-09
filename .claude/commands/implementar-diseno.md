# implementar-diseño

Implementa los componentes de una página Figma con fidelidad pixel-perfect.

**Argumentos:** `$ARGUMENTS`
- Arg 1 (requerido): ruta al archivo `definitions/figma-pages/*.md`
- Flag `--component {slug}` (opcional): implementa solo un componente específico
- Flag `--issues "..."` (opcional): issues puntuales a resolver — usado por el loop

```
/implementar-diseño definitions/figma-pages/catalogo.md
/implementar-diseño definitions/figma-pages/catalogo.md --component drawer-nuevo --issues "border-radius 8 vs 12"
```

---

## Paso 0 — Leer configuración, workflow y registro

Lee estos tres archivos antes de escribir cualquier línea de código:

1. `definitions/.project-config.json` → rutas reales del theme y del proyecto
2. `definitions/figma-to-code-workflow.md` → lecciones aprendidas (aplica cada una relevante)
3. `definitions/component-registry.json` → qué componentes ya existen

Si no existe `.project-config.json`:
> ⛔ Corre `/iniciar-proyecto` antes de implementar.

---

## Paso 1 — Verificar el registro antes de tocar el código

Para cada componente identificado en el archivo figma-pages:

1. Extrae el node-id del link de Figma (segmento `node-id=` de la URL)
2. Consulta el registro:
   ```
   /component-registry --search "{node-id} {tipo de componente}"
   ```

### Si hay MATCH EXACTO (nodo Figma registrado)
→ No implementes nada.
→ Importa el componente existente donde se necesite.
→ Si el componente es **global**: solo configura las props para esta pantalla específica.
  Si no sabes qué props usar para este contexto: pregunta al usuario antes de continuar.
  ```
  El componente {Nombre} ya existe como global.
  Para esta pantalla necesito saber:
  - ¿Qué datos mostrará? (ej: lista de productos, lista de usuarios)
  - ¿Hay alguna acción diferente al uso anterior? (ej: sin botón de eliminar)
  ```
→ Registra en `.loop-state.json`: `"status": "reused", "score": 100`

### Si hay CANDIDATO SIMILAR
→ Captura screenshot del componente existente con Playwright.
→ Compara contra el Figma del nuevo.
→ Si es ≥80% igual: adapta con props o extensión mínima. No crees uno nuevo.
→ Si es <80%: implementa nuevo pero usa el existente como referencia de estructura.

### Si NO hay match
→ Implementa desde cero (ver Paso 2).
→ Al terminar, si el build pasa, registra:
  ```
  /component-registry --add {ruta-del-archivo-generado}
  ```

---

## Paso 2 — Implementar (solo lo que no tiene match)

### Componentes que se repiten — detección automática

Durante la implementación, si encuentras un patrón visual que ya implementaste en esta misma sesión
(mismo layout, misma estructura, mismos elementos) en otra sección del Figma:

**No lo implementes de nuevo.** Informa:

> 💡 El componente "{nombre}" es visualmente idéntico (o muy similar) a "{componente anterior}".
> Lo voy a reutilizar configurando las props necesarias para este contexto.
> ¿Confirmas, o prefieres que sea una implementación independiente?

Si el usuario confirma reutilización: usa el existente, documenta como `"reused"`.
Si el mismo patrón aparece en **3 o más pantallas distintas**: márcalo como global automáticamente.

### Orden de implementación

**Página principal:**
```
get_design_context → {URL del nodo}
get_screenshot → {URL del nodo}
```
Analiza nodo por nodo desde la raíz hacia las hojas:
- Layout container (flex direction, gap, padding)
- Tokens de color, tipografía y spacing — siempre referenciados desde el theme en `{ruta del theme}/cosmosTheme.ts`
- Componentes MUI correspondientes
- Iconos Tabler

```
Utiliza @definitions/figma-to-code-workflow.md
Implementa {nombre} del nodo: {URL}
Stack: React 19 + TypeScript 5.9 + MUI 7 + Tabler Icons
Theme: {ruta real del theme}/cosmosTheme.ts
Feature-Sliced Design
Issues específicos si aplica: {--issues}
```

**Vistas alternativas / estados:**
Úsalas como contexto visual con `get_screenshot`. No implementes por separado
a menos que representen un componente distinto no implementado aún.

**Elementos complementarios:**
Cada subsección es un grupo de variantes del mismo componente.
- Captura screenshot de todos para entender los estados
- Implementa el componente UNA sola vez con el link más representativo
- Incluye todos los estados en esa única implementación

**Pantallas de contexto:**
Solo referencia visual. No implementar nada de aquí.

---

## Paso 3 — Build check después de cada componente

```bash
bun run build 2>&1
```

Corrige cualquier error TypeScript antes de continuar.

Actualiza `definitions/.loop-state.json`:
```json
"{component-slug}": { "status": "implemented", "score": null, "buildOk": true }
```

---

## Paso 4 — Limpieza

```bash
rm -f .playwright-mcp/*.png .playwright-mcp/*.jpeg .playwright-mcp/*.yml .playwright-mcp/*.log 2>/dev/null
```

Reporta:
- Qué se implementó desde cero
- Qué se reutilizó del registro (con ruta)
- Qué se marcó como global
- Qué quedó con `score: null` (pendiente de revisión)
