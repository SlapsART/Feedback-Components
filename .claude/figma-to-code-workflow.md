# Workflow: Figma a Codigo

## Proposito

Este documento define el proceso estandar para convertir disenos de Figma en codigo production-ready usando React + MUI 7 + Feature-Sliced Design. Sirve como instruccion que Claude Code sigue automaticamente al recibir una URL de Figma.

> **Nota**: Este documento es iterativo. Se actualiza con lecciones aprendidas de cada implementacion.

---

## Pre-requisitos

Antes de iniciar cualquier implementacion:

- [ ] URL del frame o pagina en Figma
- [ ] Dev server corriendo (`bun run dev`)
- [ ] Playwright MCP instalado con `--caps=vision,testing`
- [ ] Figma MCP conectado (plugin habilitado)

**Stack del proyecto:**
- React 19 + TypeScript 5.9 (strict mode)
- MUI 7 con tema Cosmos (`src/app/styles/cosmosTheme.ts`)
- Iconos: `@tabler/icons-react`
- Path alias: `@/` → `src/`
- Arquitectura: Feature-Sliced Design (ver `definitions/feature-sliced-design.md`)

---

## Convenciones del proyecto

- Stack: React 19 + TypeScript 5.9 + MUI 7 + Tabler Icons
- Arquitectura: Feature-Sliced Design
- Theme: src/app/styles/theme/cosmosTheme.ts
- Tokens de diseño: src/app/styles/theme/ThemeCOSMOS.json

---

## Fase 1: Analisis del Diseno

Ejecutar las herramientas MCP de Figma en este orden:

| Paso | Herramienta MCP | Proposito |
|------|----------------|-----------|
| 1 | `get_metadata` | Estructura XML: IDs, nombres, dimensiones. Usar esto PRIMERO para entender la jerarquia sin sobrecargar el contexto |
| 2 | `get_design_context` (nodos hijos) | Datos estructurados de nodos individuales (una fila, el header, el footer). NO llamar en el nodo raiz si es complejo (>50 hijos) porque puede generar >100KB |
| 3 | `get_screenshot` | Vision general visual del frame completo para referencia |
| 4 | `get_variable_defs` | Tokens de diseno (variables y estilos definidos en Figma) |
| 5 | `search_design_system` | Buscar componentes reutilizables en la libreria del design system |
| 6 | `get_code_connect_map` | Verificar si existen mappings previos entre nodos Figma y codigo |

> **Importante**: Para componentes complejos (DataGrid, formularios grandes), llamar `get_design_context` en nodos hijos individuales en vez del nodo raiz. Esto evita respuestas truncadas y permite analizar cada seccion en detalle.

### Que extraer del analisis

- **Jerarquia de componentes**: que bloques visuales componen la pagina
- **Colores**: hex exactos de fondos, textos, bordes, iconos
- **Tipografia**: tamano, peso, familia de cada texto
- **Spacing**: margenes, paddings, gaps entre elementos
- **Iconos**: nombres o formas de los iconos utilizados
- **Estados**: hover, disabled, selected, error (si el diseno los muestra)

---

## Fase 2: Clasificacion en Capas FSD

Cada bloque visual identificado en la Fase 1 se clasifica segun este arbol de decision:

| Pregunta | Si la respuesta es si → | Ubicacion |
|----------|------------------------|-----------|
| Es la composicion completa de una ruta/pagina? | **Page** | `src/pages/{page-name}/ui/{PageName}Page.tsx` |
| Es un bloque UI autonomo grande (tabla, formulario, sidebar)? | **Widget** | `src/widgets/{widget-name}/ui/{WidgetName}.tsx` |
| Es una accion del usuario con valor de negocio (aprobar, filtrar, buscar)? | **Feature** | `src/features/{verb-noun}/ui/{VerbNoun}.tsx` |
| Es la representacion visual de una entidad de dominio? | **Entity** | `src/entities/{entity}/ui/{EntityName}Card.tsx` |
| Es un primitivo UI reutilizable (badge, status indicator)? | **Shared** | `src/shared/ui/{ComponentName}.tsx` |

### Convenciones de nombrado

- **Carpetas**: `kebab-case` (ej: `entrada-radicador`, `obligaciones-table`)
- **Componentes**: `PascalCase` (ej: `EntradaRadicadorPage`, `ObligacionesTable`)
- **Features**: verbo + sustantivo (ej: `filter-obligations`, `approve-entry`)
- **Entities**: sustantivo singular (ej: `obligation`, `user`)
- **Barrel exports**: cada slice tiene `index.ts` que exporta su API publica

```
src/{layer}/{slice-name}/
├── index.ts          # export { ComponentName } from './ui/ComponentName'
└── ui/
    └── ComponentName.tsx
```

---

## Fase 3: Mapeo de Tokens al Tema Cosmos

### Colores

Mapear cada color de Figma al token mas cercano de `cosmosTheme.ts`:

| Color en Figma | Token en theme |
|---------------|---------------|
| Violeta/morado | `theme.palette.primary.*` (main: #5323de) |
| Cyan/turquesa | `theme.palette.secondary.*` (main: #00bcd4) |
| Rojo | `theme.palette.error.*` (main: #d14343) |
| Naranja | `theme.palette.warning.*` (main: #fb8500) |
| Azul | `theme.palette.info.*` (main: #2d9fc5) |
| Verde | `theme.palette.success.*` (main: #8fc93a) |
| Grises | `theme.palette.grey.*` (50: #fbfbfb ... 900: #a2a6ab) |
| #101840 (texto oscuro) | `theme.palette.text.primary` |
| rgba(16,24,64,0.6) | `theme.palette.text.secondary` |
| #f5f5f5 (fondo) | `theme.palette.background.default` |
| #ffffff (superficies) | `theme.palette.background.paper` |

**Tonos de cada color** (50-900): usar el sufijo numerico. Ejemplo: `theme.palette.primary[300]` para #b9b3ff.

### Tipografia

| Tamano en Figma | Variant MUI | Font size |
|----------------|-------------|-----------|
| 40px | `h1` | 2.5rem |
| 32px | `h2` | 2rem |
| 28px | `h3` | 1.75rem |
| 22px | `h4` | 1.375rem |
| 18px | `h5` | 1.125rem |
| 16px | `h6` | 1rem |
| 14px regular | `body1` | 0.875rem |
| 14px medium | `subtitle1` | 0.875rem (fw:400) |
| 13px regular | `body2` | 0.8125rem |
| 13px medium | `subtitle2` | 0.8125rem (fw:500) |
| 12px | `body3` | 0.75rem |
| 11px normal | `caption` | 0.6875rem |
| 11px uppercase | `overline` | 0.6875rem |

**Regla**: siempre usar `<Typography variant="...">`, nunca `fontSize` inline.

### Spacing

- **Unidad base**: 8px
- **Formula**: valor en Figma / 8 = multiplicador para `theme.spacing(n)`
- Ejemplos: 4px = `theme.spacing(0.5)`, 8px = `theme.spacing(1)`, 16px = `theme.spacing(2)`, 24px = `theme.spacing(3)`

### Componentes Figma → MUI

| Elemento en Figma | Componente MUI | Notas |
|-------------------|---------------|-------|
| Frame / Auto layout (vertical) | `Stack` o `Box` con `flexDirection: 'column'` | Preferir `Stack` con `spacing` |
| Frame / Auto layout (horizontal) | `Stack direction="row"` | |
| Text | `Typography` | Siempre con `variant` |
| Button | `Button` | Default `size="small"`, `textTransform: none` ya aplicado |
| Input / Text field | `TextField` | Default `size="small"` |
| Table / Data table | `DataGrid` | Usar `density="compact"` (26px rows) |
| Checkbox | `Checkbox` | |
| Toggle / Switch | `Switch` | |
| Dropdown / Select | `Select` o `Autocomplete` | |
| Modal / Dialog | `Dialog` | |
| Card | `Card` | |
| Divider / Line | `Divider` | |
| Chip / Tag | `Chip` | `borderRadius: 4` ya aplicado |
| Alert / Banner | `Alert` | |
| Tooltip | `Tooltip` | Fondo violeta claro ya configurado |
| Tabs | `Tabs` + `Tab` | `textTransform: none` ya aplicado |
| Icon | `@tabler/icons-react` | Formato: `Icon{PascalCaseName}` |
| Avatar | `Avatar` | Fondo gris #ced1d4 ya configurado |
| Breadcrumbs | `Breadcrumbs` | |
| Stepper | `Stepper` | |
| Snackbar | `Snackbar` | Fondo #323232 ya configurado |
| Rating | `Rating` | Color #ffb400 ya configurado |

### Deteccion y correccion de discrepancias de tokens

Si un color, tamano de fuente, spacing u otro token del diseno de Figma **NO tiene equivalente exacto** en `cosmosTheme.ts`:

1. **Documentar** la discrepancia con valor exacto de Figma vs valor actual del theme
2. **Actualizar siempre `src/app/styles/cosmosTheme.ts`** con el valor del Figma Handoff. El Figma es la fuente de verdad para los tokens visuales del proyecto.
3. **Agregar comentario** en el theme indicando que el valor fue actualizado desde el Figma Handoff (ej: `// actualizado desde Figma Handoff (antes: #xxx)`)
4. **Registrar** la discrepancia en la tabla de discrepancias y en la seccion "Lecciones aprendidas" de este documento

> **Regla**: El Figma Handoff siempre tiene prioridad sobre los valores actuales del theme. Cuando hay diferencia, se actualiza el theme, no se adapta el codigo al theme viejo.

---

## Fase 4: Implementacion

### Orden estricto bottom-up

```
shared → entities → features → widgets → pages
```

Implementar en este orden para respetar la regla FSD de que los imports solo fluyen de arriba hacia abajo.

### Reglas de implementacion

1. **Estructura FSD**: crear carpeta del slice con `index.ts` barrel export
2. **Componentes delgados**: los `.tsx` en `ui/` solo contienen JSX y presentacion. Toda la logica (estado, efectos, validaciones, mutations) se extrae a custom hooks en `hooks/`
3. **Hooks vs lib**: los custom hooks (`useX`) van en `hooks/`. Las funciones puras sin estado van en `lib/`. NUNCA mezclar
4. **Estilos**: usar `sx` prop para estilos one-off. Nunca usar `style` inline
5. **Colores**: nunca hardcodear hex. Siempre `theme.palette.*`
6. **Tipografia**: nunca hardcodear font-size. Siempre `<Typography variant="...">`
7. **Spacing**: nunca hardcodear px. Siempre `theme.spacing(n)`
8. **Layout**: usar `Box`, `Stack`, `Grid` en vez de `<div>` raw
9. **Iconos**: importar de `@tabler/icons-react` con formato `Icon{PascalCaseName}`
10. **Defaults**: respetar defaults del theme (buttons small, inputs small, lists dense)
11. **TypeScript**: sin `any`, usar tipos estrictos
12. **Code Connect**: al finalizar, registrar mappings con `add_code_connect_map`

---

## Fase 5: Verificacion Visual — El resultado debe ser igual al Figma

El objetivo es lograr **fidelidad visual 1:1** entre la implementacion y el diseno de Figma.

### Ciclo de verificacion

#### 1. Capturar ambas fuentes

```
# Implementacion (Playwright MCP)
browser_navigate → localhost:{port}/{ruta}
browser_take_screenshot → captura de la pagina implementada

# Diseno original (Figma MCP)
get_screenshot → captura del frame de Figma
```

#### 2. Comparacion visual directa

Analizar ambos screenshots verificando:

- **Layout**: posiciones, distribuciones, alineacion de elementos
- **Colores**: fondos, textos, bordes, iconos — deben coincidir exactamente
- **Tipografia**: tamano, peso, familia, line-height
- **Spacing**: margenes, paddings, gaps entre elementos
- **Componentes**: bordes, sombras, border-radius, estados visuales

#### 3. Verificacion programatica con `browser_evaluate`

Extraer estilos computados de elementos clave para detectar diferencias sutiles:

```javascript
// Ejemplo: extraer estilos computados de un elemento
const el = document.querySelector('.MuiTypography-h6');
const styles = window.getComputedStyle(el);
return {
  fontSize: styles.fontSize,
  fontWeight: styles.fontWeight,
  color: styles.color,
  padding: styles.padding,
  margin: styles.margin
};
```

Comparar estos valores contra los tokens esperados del diseno de Figma.

#### 4. Verificacion de contenido con testing tools

```
browser_verify_element_visible → confirmar que todos los elementos del diseno estan presentes
browser_verify_text_visible → confirmar que los textos son visibles y correctos
```

#### 5. Ciclo de correccion

Si hay diferencias → corregir el codigo → repetir la verificacion hasta lograr fidelidad 1:1.

#### 6. Verificacion de accesibilidad

```
browser_snapshot → obtener arbol de accesibilidad del DOM
```

Verificar que la estructura semantica es correcta (headings, landmarks, labels).

#### 7. Limpieza de screenshots

Al finalizar la verificacion, **eliminar todos los screenshots generados por Playwright** en `.playwright-mcp/`:

```bash
rm -f .playwright-mcp/*.png .playwright-mcp/*.jpeg
```

> **Regla**: Nunca dejar screenshots de verificacion en el proyecto. Son archivos temporales que no deben commitearse.

---

## Fase 6: Correccion y Documentacion de Discrepancias

Cuando se detectan diferencias durante la verificacion:

### Clasificacion

| Tipo | Accion |
|------|--------|
| Error de implementacion | Corregir codigo, re-verificar con Playwright |
| Token faltante o diferente en theme | **Actualizar `cosmosTheme.ts`** con el valor del Figma + documentar en tabla de discrepancias |
| Diferencia intencional | Documentar justificacion |

> **Regla**: Ante cualquier discrepancia de tokens, siempre modificar `src/app/styles/cosmosTheme.ts` para que coincida con el Figma Handoff. No usar valores "cercanos" ni dejar el theme desactualizado.

### Tabla de discrepancias

Cuando un token no existe en el theme, documentar asi:

| Propiedad | Valor Figma | Valor anterior en theme | Decision |
|-----------|------------|------------------------|----------|
| Chip primary background | #e1e6ff | #c4e1f5 (azul claro) | Actualizar theme — el Figma Handoff usa violeta claro, no azul |
| Chip primary text color | #2f43d0 | #5a5e73 (gris) | Actualizar theme — el Figma Handoff usa violeta oscuro como texto |
| Chip primary hover | #c8cfff (derivado) | #a2cdee | Actualizar theme — derivado del nuevo primary chip |
| Chip outlined primary border/text | #2f43d0 | #5323de | Actualizar theme — consistencia con chip filled primary |
| Chip outlined success border/text | #72b525 | #8fc93a | Actualizar theme — Figma Handoff usa tono mas oscuro para outlined success |
| Chip outlined info border/text | #228db8 | #2d9fc5 | Actualizar theme — Figma Handoff usa tono mas oscuro para outlined info |
| Chip outlined error border/text | #c63434 | #d14343 | Actualizar theme — Figma Handoff usa tono mas oscuro para outlined error |
| Filter chip badge colors | Cada filtro tiene badge con color semantico propio (success/200, info/200, primary/200, error/200) | Badge sin color semantico | Implementar badge colors por estado en cada panel |

---

## Checklist de Calidad

Antes de considerar una pagina terminada:

- [ ] `bun run build` compila sin errores
- [ ] `bun run lint` pasa sin warnings
- [ ] Verificacion visual con Playwright: resultado identico al Figma
- [ ] No hay colores hex hardcoded (todo via `theme.palette.*`)
- [ ] No hay font-sizes hardcoded (todo via `Typography` variant o `theme.typography.*`)
- [ ] No hay spacing hardcoded (todo via `theme.spacing()`)
- [ ] Imports FSD respetados (sin imports hacia arriba ni circulares)
- [ ] Componentes en `ui/` son delgados (logica en `hooks/`, helpers en `lib/`)
- [ ] No hay hooks (`useX`) en carpetas `lib/` ni `ui/`
- [ ] Cada slice tiene `index.ts` barrel export
- [ ] Componentes usan MUI, no HTML raw (`div`, `span`, `p`)
- [ ] Iconos importados de `@tabler/icons-react`
- [ ] Defaults densos respetados (buttons small, inputs small, DataGrid compact)
- [ ] Sin tipos `any` en TypeScript
- [ ] Discrepancias de tokens documentadas y resueltas
- [ ] Nombres PascalCase (componentes) y kebab-case (carpetas)
- [ ] Screenshots de Playwright eliminados (`.playwright-mcp/*.png`, `*.jpeg`)

---

## Ejemplo de Referencia

Patron existente en el proyecto:

```
src/pages/entrada-radicador/
├── index.ts                          # export { EntradaRadicadorPage } from './ui/EntradaRadicadorPage'
└── ui/
    └── EntradaRadicadorPage.tsx       # Importa widget de @/widgets/obligaciones-table

src/widgets/obligaciones-table/
├── index.ts                          # export { ObligacionesTable } from './ui/ObligacionesTable'
└── ui/
    └── ObligacionesTable.tsx          # Usa Box, Typography de MUI
```

La page compone widgets. Los widgets usan componentes MUI con el tema Cosmos.

---

## Lecciones Aprendidas

*(Esta seccion se actualiza con cada implementacion)*

| Fecha | Leccion | Contexto |
|-------|---------|----------|
| 2025-03-25 | `get_design_context` puede generar output >100KB que no cabe en contexto. Usar `get_metadata` primero para obtener la estructura y luego `get_design_context` en nodos hijos especificos (ej: una fila, el footer) | DataGrid Obligaciones Radicador — nodo 4542:69042 |
| 2025-03-25 | Los assets de imagenes del Figma MCP (`figma.com/api/mcp/asset/...`) son URLs temporales (7 dias). Para produccion, descargar y guardar en `src/shared/assets/` | Logos de tarjetas Mastercard, Visa, Diners, Amex |
| 2025-03-25 | El paquete correcto para iconos React es `@tabler/icons-react`, no `@tabler/icons` (que es solo SVG). Verificar que el paquete `-react` esta en package.json | Import de IconFileDescription, IconStar |
| 2025-03-25 | `@mui/x-data-grid` no viene incluido con MUI 7. Debe instalarse aparte con `bun add @mui/x-data-grid`. El theme ya tiene estilos para MuiDataGrid | Implementacion del DataGrid |
| 2025-03-25 | Para la Fase de Analisis, la secuencia optima es: (1) `get_metadata` para estructura, (2) `get_design_context` en nodos hijos individuales (una fila, el header, el footer), (3) `get_screenshot` para referencia visual. Esto evita respuestas truncadas | Workflow optimizado tras primera prueba |
| 2025-03-25 | Los Figma components con nombre `<DataGrid>` mapean directamente a MUI DataGrid. Los headers usan `body2` con `text.secondary`, las celdas `body2` con `text.primary` o `text.secondary` segun importancia | Mapeo de componentes Figma → MUI |
| 2025-03-25 | En el Figma, los logos de medio de pago son imagenes rasterizadas dentro de un frame de 23x16px con borde `#d9d9d9` y border-radius `2.5px`. En produccion conviene reemplazarlos por SVGs del design system | Columna "Medio" del DataGrid |
| 2025-03-25 | Playwright MCP `browser_navigate` + `browser_take_screenshot` es la forma mas rapida de verificar. El `browser_snapshot` (arbol de accesibilidad) sirve para confirmar que los datos se renderizan correctamente sin necesidad de screenshot | Verificacion visual |
| 2026-03-25 | En MUI X DataGrid v8, `.MuiDataGrid-columnHeaderRow` NO existe como clase standalone (solo como sufijo Emotion `css-xxx-MuiDataGrid-columnHeaderRow`). La clase real del header row es `.MuiDataGrid-row--borderBottom`. Ademas, cada `.MuiDataGrid-columnHeader` tiene `background-color: white` por defecto, lo que tapa cualquier fondo aplicado al row padre. Para aplicar bgcolor al header, usar el selector `& .MuiDataGrid-columnHeader` directamente | Header bgcolor del DataGrid |
| 2026-03-25 | Para validar que un estilo se aplico correctamente en MUI/DataGrid: (1) Usar `browser_evaluate` con `querySelector` para verificar que el selector CSS apunta a un elemento real (no retorna `null`). (2) Leer `window.getComputedStyle(el).backgroundColor` (u otra propiedad) para confirmar el valor computado. (3) Si el valor no coincide, inspeccionar elementos hijos/padres — un hijo con fondo opaco puede tapar el estilo del padre. (4) Probar el estilo inline via `browser_evaluate` (`el.style.backgroundColor = '#xxx'`) y tomar screenshot para confirmar visualmente antes de modificar el codigo | Validacion de estilos con Playwright |
| 2026-03-25 | Una vez que el usuario confirme que el diseno esta correctamente implementado, eliminar todos los screenshots `.png`/`.jpeg` generados por Playwright en `.playwright-mcp/` para no acumular archivos temporales en el proyecto | Limpieza post-verificacion |
| 2026-03-25 | Cuando en el Figma una toolbar tiene elementos a la izquierda (chips, filtros) y a la derecha (search, acciones) en la misma fila, NO separarlos en componentes/contenedores distintos. Deben estar en el mismo `Box` con `display: flex` y `justifyContent: space-between`. Si un panel necesita su propia toolbar (ej: chips de filtro), mover el search al panel en vez de dejarlo en el shell padre | Alineacion toolbar Devoluciones |
| 2026-03-25 | Cuando una columna del DataGrid usa colores condicionales (ej: "Vence en" con rojo para urgencia), el Figma MCP no siempre expone la logica de colores en la data estructurada. Verificar visualmente en el screenshot de Figma comparando valores y sus colores para inferir la regla. En este caso: valores <= 3 dias usan `error.main`, "Hoy" usa `text.primary` bold, y el resto `text.secondary` | Colores condicionales en columna Vence en |
| 2026-03-25 | El empty state de las tablas NO usa `noRowsOverlay` del DataGrid. En el Figma, cuando no hay datos se oculta TODO (toolbar, chips, search, DataGrid) y se muestra solo el EmptyState centrado debajo de los tabs. Implementar con early return condicional: `if (rows.length === 0) return <EmptyState ... />` antes del render del toolbar+grid. El componente EmptyState va en `shared/ui/` con el SVG de ilustracion en `shared/assets/EmptyState/` | Empty state de tablas sin datos |
| 2026-03-25 | Los colores de Chip en el Figma Handoff (primary bg: `#e1e6ff`, text: `#2f43d0`) NO coincidian con los tokens del theme original (bg: `#c4e1f5`, text: `#5a5e73`). Se actualizo `cosmosTheme.ts` con los valores del Figma. **Siempre verificar los colores de Chips contra el Figma antes de implementar**, ya que el design system Cosmos puede tener tokens actualizados que aun no se reflejan en el theme del proyecto | Discrepancia Chip colors en tabla Devoluciones — nodo 4542:72114 |
| 2026-03-25 | Los chips outlined del Figma usan tonos mas oscuros que los `*.main` del theme para bordes/texto: success `#72b525` (vs `#8fc93a`), info `#228db8` (vs `#2d9fc5`), error `#c63434` (vs `#d14343`). Se actualizaron todos en `cosmosTheme.ts`. **Patron**: los outlined chips en Figma tienden a usar tonos 700-800 de la paleta en vez del `main` (500) | Chips outlined en tabla Anticipos — nodo 4568:67245 |
| 2026-03-25 | Los filter chips del Figma tienen badges (pills) con color semantico diferente por cada filtro (ej: Vigente usa primary/200, Pagado usa success/200, Cerrado usa error/200). El badge del filtro activo usa su color semantico; el badge inactivo usa `grey.200` con `text.secondary`. Implementar con un `filterBadgeColors` map por label | Filter chips con badges semanticos en Anticipos |
| 2026-03-25 | Los status chips de cada panel mapean a colores MUI semanticos diferentes. Siempre verificar contra el Figma: (1) Vigente = `primary` (no `info`), (2) Regularizado = `info` (no `success`), (3) Cerrado = `error` (no `default`), (4) Reversado = `default` (no `error`). El mapeo no es intuitivo — siempre confirmar con el Figma | Mapeo estado→color en chips de tabla Anticipos |
| 2026-03-25 | El nodo `content` del Figma envuelve el DataGrid en una card con `background.paper` (white), `border-radius: 8px` y `box-shadow: 6px 4px 4px 0px rgba(73,71,71,0.03)`. Agregar `CssBaseline` en `main.tsx` para que el fondo de la pagina sea `background.default` (#f5f5f5) y la card blanca se distinga. El titulo "Obligaciones por pagar" va FUERA de la card, directamente sobre el fondo gris | Estructura page: fondo gris + card blanca — nodo 4542:72700 |
| 2026-03-25 | **CRITICO**: El theme `cosmosTheme.ts` define estilos para `MuiDataGrid-root--densityStandard` con `!important` (rows 32px, headers 40px). Si el DataGrid no especifica `density`, usa `standard` por defecto. Los `sx` del componente con selectores simples (`& .MuiDataGrid-row`) NO sobrescriben el theme porque tienen menor especificidad. **Solucion**: usar selectores con prefijo de densidad en los `sx`: `&.MuiDataGrid-root--densityStandard .MuiDataGrid-row` para que tengan la misma especificidad que el theme y el ultimo en insertarse gane. Valores del Figma: headers=24px, rows=40px, footer=22px | Especificidad CSS de DataGrid vs theme — nodo 4272:87752 |
| 2026-03-26 | **Regla IA Label**: Toda referencia a "IA" en la UI (etiquetas "GENERADO CON IA", "EXTRAÍDO CON IA", "Ver sugerida IA", etc.) debe usar el SVG `src/shared/assets/IA-label.svg` renderizado como `<Box component="img" src={iaLabelSrc} alt="IA" sx={{ width: 19, height: 18 }} />`. **Nunca** usar texto plano "IA", Chips con label "IA", ni emojis ✦ como sustituto. En Vite, los SVG importados son URLs (strings), no componentes React — siempre renderizar con `<img>`, nunca como `<Component />` | Labels IA en RegistroForm, OCRSkeleton, DistribucionCostosDialog, VincularObligacionDialog |
| 2026-05-12 | **CRITICO**: `<Chip sx={{ bgcolor, color }}>` SIN la prop `color` (primary/warning/...) cae en `MuiChip-colorDefault` del theme, que tiene mayor especificidad CSS que `sx`. El chip se renderiza gris regardless del `bgcolor` que pongas en sx. **Solucion**: SIEMPRE pasar la prop `color` al Chip (primary, warning, success, etc) y mantener los tokens en `cosmosTheme.ts` actualizados con los valores Figma. Para casos one-off (ej: Chip blanco sobre fondo tinted), usar selector explicito: `sx={{ '&.MuiChip-colorDefault': { bgcolor: '...', color: '...' } }}` para ganar especificidad | Chips Pendiente/Devuelto en Consola Borradores — nodos 2733:55453, I2729:41426;2503:113386 |
| 2026-05-12 | **Theme cleanup chips text colors**: Los `MuiChip-colorWarning/Success/Error/Info` en `cosmosTheme.ts` tenian text color `#5a5e73` (gris generico) que NO matchea Figma. Actualizado con tokens semanticos verbatim del Figma: warning=`#bf360c` (deepOrange/900), success=`#3f6212`+bg=`#e8f5d0`, error=`#c63434`, info=`#228db8`. **Patron**: el Cosmos design system usa el tono ~700-900 de la paleta para texto de chips filled, NO el `*.main` (500) ni un gris neutro | Discrepancia chips colorWarning/Success/Error/Info vs Figma vars |
| 2026-05-12 | **Floating action bars (Floating_bar Figma)**: Cuando un `Floating_bar` aparece en Figma con dimensiones especificas (ej: 698×56 dentro de un panel de 870×650), NO usar `position:absolute, left:0, right:0` — eso lo estira full-width. Usar `position:absolute; bottom:N; left:50%; transform: translateX(-50%); width: min({figmaWidth}px, calc(100% - {gutter}px))` + box-shadow elevation/2 para que luzca flotante con margenes simetricos. Los Floating_bar siempre tienen elevation, no son barras planas pegadas al borde | BalanceFooter Consola Contabilizacion — nodo 2729:41428 |
| 2026-05-12 | **List item selected state**: En el Figma, los items seleccionados de listas tipo sidebar (ej: borradores, navegacion) tienen tres senales visuales: (1) bg `var(--primary/_states/selected, rgba(47,67,208,0.08))`, (2) un pequeno **left accent bar** primary 3px ancho × 24px alto con `border-radius: 0 2px 2px 0` posicionado vertically-centered, (3) ligero margen externo (mx) para que el bg no toque los bordes del contenedor. El accent bar se implementa con `&::before { content: ""; position: absolute; left: 0; ... }` sobre el row con `position: relative`. Sin el accent, los items se ven "pegados" al borde y no se distingue bien la seleccion | List items en BorradoresSidebar — node 2733:55453 |
| 2026-05-12 | **Workflow optimo para componentes con muchos sub-nodos**: Para implementar fielmente nodos Figma complejos (sidebar, detail panel) con jerarquia profunda y output >50KB de `get_design_context`: (1) Llamar `get_metadata` en el nodo raiz para mapear estructura, (2) Llamar `get_design_context` en cada nodo hijo principal (sidebar, content, footer) en paralelo si caben en contexto, (3) Si el output excede el limite (~30KB), se guarda automaticamente a un .txt — delegar el procesamiento a un Agent con `subagent_type=general-purpose` con prompt explicito: "lee con jq, extrae verbatim hex/px/font-specs/Tailwind classes para reimplementacion 1:1 en MUI". El subagent regresa un spec sheet de ~300 lineas que se puede aplicar directamente. Esto evita perder detalles vs intentar resumir | Implementacion Consola Contabilizacion 17 vistas — agentes addb85b8b9fcdfa1a, a1ba41860eefc0ef3 |
| 2026-05-12 | **REGLA DE ORO: SIEMPRE validar visualmente con Playwright contra Figma — nunca asumir que los defaults de MUI matchean el diseño**. Durante esta sesion entregue varios componentes "implementados" SIN validar contra el Figma (Autocomplete dropdown, DocumentoViewer, edit cell, resize del sidebar en Tres Bloques) — el usuario los detecto despues y tuve que rehacer. **Por que es facil caer**: MUI tiene defaults razonables que se ven "bien" en aislado, pero el Figma puede usar variantes muy diferentes (ej: Autocomplete options de 2 lineas via `renderOption`, dropdown con bottom border primary 2px, sidebar compact con scroll buttons). **Fix de proceso**: para CADA componente implementado, hacer (1) `get_screenshot` de Figma, (2) `browser_take_screenshot` de la implementacion, (3) compararlos lado a lado ANTES de decir "listo". Si no se valido, ser explicito y decirlo al usuario en vez de implicar fidelidad. **Sin excepciones — incluye estados secundarios** como dropdowns abiertos, modales con valores pre-llenos, hover states, vistas comprimidas | Multiple componentes Consola Contabilizacion — sesion 2026-05-12 |
| 2026-05-12 | **MUI Autocomplete: `renderOption` es OBLIGATORIO cuando el Figma muestra items con multiples lineas o iconos**. El default de MUI Autocomplete renderiza items como `<li>` con texto plano (una linea). Si el Figma muestra options de 2 lineas (code + description), 3 lineas con avatar, o cualquier estructura compleja, hay que pasar `renderOption={(props, option) => <Box component="li" ...>...</Box>}` extrayendo `key` del props antes de spread (`const { key, ...rest } = props`). Tambien estilizar el `slotProps.paper.sx` para borderRadius. Sin esto el dropdown se ve genérico y NO matchea Figma | LineaContableDialog dropdown options — nodo 2733:64277 |
| 2026-05-12 | **MUI TextField floating label: NO setear `fontSize` directamente en el `label` prop**. MUI escala automaticamente la label a `0.75x` cuando entra en estado "shrunken" (con valor o focus). Si pones `fontSize: 10` para matchear el Figma input/label `10px Light`, la label visible cuando shrunken sera `7.5px` (ilegible). El Figma muestra el TAMAÑO FINAL (shrunken), no el source. **Fix**: dejar el default de MUI (14px que escala a 10.5px) o, si necesitas un override exacto, calcular `valor_figma / 0.75` como source. Tambien usar `<>...</>` fragment como label para asterisk rojo + texto, NO `<Box component="span">` con sx (puede romper la animacion) | LineaContableDialog labels — sesion 2026-05-12 |
| 2026-05-12 | **MUI X DataGrid v8: poner `borderBottom` en `.MuiDataGrid-row` causa una linea visible "cortando" el row al hacer hover/scroll**. Los selectores de row a veces se renderizan con sub-pixel issues que combinan con el row's flex layout y el filler row interno, produciendo el efecto de linea atravesando el contenido. **Fix verificado**: mover el border al `.MuiDataGrid-cell` con `borderBottom: '1px solid grey.200'` + `boxSizing: 'border-box'`, y ocultar `& .MuiDataGrid-filler { display: none }`. El cell-level border respeta el row height correctamente | BorradorPartidasGrid + BorradorEnviadoView — sesion 2026-05-12 |
| 2026-05-12 | **Sidebar/listas que aparecen junto a un panel adicional deben ser RESPONSIVE con scroll horizontal en tabs/chips**. En el Figma cuando se abre un visor lateral (ej: Tres Bloques con PDF), el sidebar pasa de 400px→240px y los tabs/filter chips muestran arrows `<` `>` para scrollear horizontalmente porque ya no caben. **Fix patron**: prop `compact?: boolean` que cambia el width con transicion 200ms + `<Tabs variant="scrollable" scrollButtons="auto">` + filter chips row con `overflowX: auto` y scrollbar de 4px. Sin esto el sidebar se queda en 400px y el panel central se aplasta o aparece overflow horizontal feo | BorradoresSidebar `compact` mode — Tres Bloques |
| 2026-05-12 | **Mocks de testing: inyectar entries directos al data source es mejor que query params**. Para que el usuario pueda probar vistas que requieren data especifica (ej: borrador con sugerencia IA para disparar dialog Aplicar/Cambiar), inyectar mocks como `[MOCK_PENDIENTE, ...apiData, MOCK_ENVIADO]` en la lista del sidebar + rutas dedicadas (`/consola/borrador/pendiente-demo`) que evitan llamada al API. Esto permite navegacion natural (click en sidebar) en vez de hacks tipo `?vista=manual-empty`. Los mocks deben tener un comentario `// TODO: remover cuando exista backend real` para no quedar permanentemente | MOCK_PENDIENTE / MOCK_ENVIADO en BorradoresSidebar |
| 2026-05-12 | **`react-number-format` para inputs monetarios**. Para Débito/Crédito y similares en formato `$1.234.567,89`, usar `<NumericFormat customInput={InputBase} thousandSeparator="." decimalSeparator="," decimalScale={2} allowNegative={false} onValueChange={({value}) => setX(value)} />`. NO usar `<input type="number">` directamente (acepta exponenciales, scientific notation, negativos) ni implementar parsing manual. El `customInput={InputBase}` permite usar dentro de DataGrid cells. Para edit-on-click pattern: state local `editing: boolean` + toggle al `onClick`/`onBlur` | EditableAmountCell BorradorPartidasGrid — vistas Manual edit-cell |
| 2026-05-29 | **CRITICO — Chip heights del Cosmos design system son DRAMATICAMENTE menores que los defaults MUI**: MUI `size="small"` = 24px y `size="medium"` = 32px, pero el Cosmos design system usa `small`=16px y `medium`=20px. SIEMPRE agregar en `cosmosTheme.ts`: `sizeSmall: { height: 16 }` y `sizeMedium: { height: 20 }`. Sin esto todos los chips quedan 50-100% mas altos que en el Figma. Verificar con `get_design_context` en el nodo de una fila real — buscar `max-h-[16px] min-h-[16px]` en la Typography interna del chip | Lista Terceros — nodo 4334:22360 (ListItem row) |
| 2026-05-29 | **CRITICO — Role/categoria chips en listas de datos son `variant="filled"` con `color="default"`, NO `variant="outlined"`**. El Figma muestra chips grises con background `#eaebec` (filled), no chips con borde y fondo transparente. Usar `<Chip label={rol} size="small" variant="filled" />` (sin color prop = default filled). El error de usar `variant="outlined"` produce fondo transparente y borde visible que no existe en el diseño | Lista Terceros — chips Rol (Proveedor/Empleado/Cliente) |
| 2026-05-29 | **`color="default"` filled chip: text color es `text.primary` (#101840), NO un gris neutro**. El Cosmos design system usa el color del texto primario para chips de categoría/etiqueta, porque el chip ya tiene el contraste visual via su background. El theme original tenia `#5a5e73` incorrecto. Actualizar `cosmosTheme.ts`: `'&.MuiChip-colorDefault': { backgroundColor: '#eaebec', color: '#101840' }` | Lista Terceros — chips Rol |
| 2026-05-29 | **Status chips (Activo/Inactivo/En registro) usan `size="medium"`, los role chips usan `size="small"`**. La diferencia visual en el Figma es clara: los status chips son visiblemente mas altos que los de rol. Con el override de altura en el tema (small=16px, medium=20px), esto se consigue simplemente diferenciando el `size` prop. Chips con icono (En registro, Inactivo) resultan en ~22px por el spacing interno del icono, que coincide con lo que muestra el Figma | Lista Terceros — columna Estado |
| 2026-05-29 | **En tablas de datos, verificar SIEMPRE el color de CADA columna con `get_design_context` antes de asumir secondary**. La columna "Tipo" (Organización/Persona) usa `text.primary` (#101840), no `text.secondary`. La tendencia a asumir que columnas no-primarias usan text.secondary es un error frecuente. Regla: solo la NIT/subtítulo del nombre y los labels de columna usan `text.secondary`; los valores de datos usan `text.primary` | Lista Terceros — columna Tipo |
| 2026-05-29 | **El subtítulo secundario de cada row (ej: NIT) usa `body2` (13px), no `body3` (12px)**. La diferencia de 1px puede parecer menor pero es visible en listas largas y altera la jerarquía visual. El Figma usa `body2` para AMBAS líneas de texto (nombre y NIT), diferenciadas solo por `fontWeight: 500` vs `400`. Verificar siempre con `get_design_context` buscando `--body/2/fontSize` o `--subtitle/2/fontSize` en los nodos Typography | Lista Terceros — texto NIT en cada row |
| 2026-05-29 | **Cuando se implementa de cero sin workflow file ni proyecto existente: SIEMPRE comenzar leyendo el design context de UN nodo hijo real (una fila, un item) antes de implementar cualquier componente de lista**. La secuencia correcta es: (1) `get_screenshot` para vision general, (2) `get_design_context` en el nodo de UNA fila/item para obtener specs exactas de tipografia, colores, heights, variant y size de cada sub-componente, (3) LUEGO implementar. Sin este paso, los defaults de MUI divergen del diseño en múltiples dimensiones simultáneamente (chip height, variant, color, text color) — cada una pequeña pero juntas hacen que el resultado se vea notablemente diferente | Implementacion inicial lista Terceros sin leer design context de row level |
| 2026-07-08 | **Borde tipo "countdown ring" que se vacía con el tiempo**: cuando Figma exporta un ejemplo de borde parcial como imagen SVG (`<img>` con asset de Figma), descargar y leer el `<path d="...">` de esa SVG revela la técnica real: es un trazo continuo de un punto fijo alrededor del perímetro. Se replica con: SVG `<rect rx={height/2}>` con `pathLength="1"`, `stroke-dasharray="1"` (fijo) y `stroke-dashoffset` animado de `0` a `1` vía `@keyframes` CSS — dasharray de 1 unidad + offset creciente hace que el segmento coloreado "retroceda" desde su propio inicio, exactamente el efecto de countdown ring. Pausar con `animation-play-state: paused` en hover, sin necesitar rAF ni JS por frame. El tamaño real del contenedor se mide con `ResizeObserver` (no hardcodear px) para que el `rx` de las esquinas siempre sea exactamente la mitad de la altura | FeedbackToast / BorderProgressRing — nodo 75:24587 (Feedback spec sheet) |
| 2026-07-08 | **`theme.palette[severity][300]` requiere augmentar `PaletteColor` con índices numéricos**: MUI tipa `PaletteColor` solo con `main/light/dark/contrastText`, aunque el theme en runtime sí define shades 50-900 (ver `baseTheme.ts`). Sin la augmentación, TypeScript rechaza el acceso a `theme.palette.info[300]`. Agregar una declaración local `declare module '@mui/material/styles' { interface PaletteColor { 50?: string; ...; 900?: string } }` en el código de la app (no en `/theme`, que es del design system) resuelve el tipo sin usar `any` | src/shared/types/mui-palette-shades.d.ts |
| 2026-07-08 | **En páginas de contexto (Figma "Feedback + X") que muestran el toast superpuesto a OTRO feature completo (ej. una consola de contabilización, un asistente de chat), verificar con `get_design_context` si ese "otro feature" tiene contenido real en el archivo o es solo fondo/gradiente decorativo**. En este caso, "Rectangle 283" (el fondo detrás del composer del Asistente) resultó ser solo un `gradient-to-t` de fondo sin mensajes de chat — el chat bubble que se veía en el screenshot compuesto de la sección pertenecía a OTROS frames de referencia (`Asistente` a secas, sin "-Feedback"), no a los frames que sí muestran el toast. Confirmar con `get_screenshot` del frame específico (no de la sección completa) antes de fabricar copy que no existe en el diseño | Feedback + Asistente abierto — nodo 82:15695 vs 82:15378 |
| 2026-07-08 | **Cuando el diseñador pide "sin DataGrid, tablas sencillas"**: usar `Table/TableHead/TableBody/TableRow/TableCell` de MUI directamente con datos mock estáticos reproduce la fidelidad visual del Figma (columnas, chips de estado, tipografía) sin la dependencia de `@mui/x-data-grid` ni su complejidad de columnas/render. Válido para páginas de demostración; no reemplaza un DataGrid real con server-side sorting/paginación en producción | ObligacionesTable, PartidasTable |
| 2026-07-08 | **Corrección a la lección anterior sobre "Rectangle 283"**: el contenido real del chat del Asistente (header con alerta + badge + subtítulo, input con chips de sugerencias, disclaimer de IA) SÍ existe en el archivo — vive en un frame HERMANO dentro de la MISMA sección Figma, nombrado solo `Asistente` (sin "-Feedback"), como referencia visual del feature completo. Nodo exacto: `82:16427` (`Frame 8288` dentro de `82:12981`). Regla general: si un componente parece "vacío" en el frame que sí tiene el toast, buscar en los frames vecinos de la sección ANTES de asumir que el contenido no existe — puede estar documentado por separado | Asistente open panel — nodo 82:16427 |
| 2026-07-08 | **Desfase visible entre un borde SVG superpuesto y el border-radius CSS de un elemento HTML hermano**: aunque la geometría se calcule correctamente (mismo ancho/alto medido), un stroke SVG muy fino (0.75px) en coordenadas fraccionarias (ej. `x=0.375`) se antialiasa en un sub-píxel distinto al que usa el navegador para renderizar el `border-radius` del `Paper` de HTML debajo, produciendo un "doble borde" visible en la esquina redondeada. **Fix**: redondear el ancho/alto medidos por `ResizeObserver` a enteros (`Math.round`) antes de calcular `x/y/width/height/rx`, usar `strokeWidth=1` (no 0.75) con `inset=strokeWidth/2` para que el centerline caiga en un límite de medio-píxel nítido, y agregar `shapeRendering: 'geometricPrecision'` al `<svg>`. Verificar con `getBoundingClientRect()` del wrapper vs los atributos `width/height` del `<svg>` — deben coincidir exactamente en enteros | BorderProgressRing — feedback-toast |
| 2026-07-08 | **Animar entrada/salida de un componente que se desmonta condicionalmente (`{visible && <Toast/>}`) sin usar `Fade`/`Grow` de MUI**: mantener el desmontaje bajo control del propio componente, no del padre. Patrón: estado interno `phase: 'entering'\|'visible'\|'exiting'`, `useEffect` con `requestAnimationFrame` que pasa de `entering` a `visible` en el primer paint (dispara la transición CSS de `opacity`/`transform`), y un `requestClose()` interno que pasa a `exiting` — SOLO al terminar la transición (`onTransitionEnd`, filtrando por `propertyName` para no disparar dos veces) se llama al `onClose` real que el padre usa para desmontar. Así ni el timeout del borde ni el click en la "X" desmontan de golpe; el padre no necesita cambiar nada | FeedbackToast — fases entering/visible/exiting (SUPERADO, ver siguiente lección) |
| 2026-07-08 | **El diseñador pidió explícitamente usar la librería `motion` (antes "Framer Motion", paquete npm `motion`, import `from 'motion/react'`) para las animaciones, en vez del patrón manual de fases CSS**. Reemplaza el patrón anterior: `FeedbackToast` ahora recibe `open` (no se desmonta condicionalmente desde el padre — SIEMPRE se renderiza) y usa `<AnimatePresence onExitComplete={onExited}>{open && <MotionBox .../>}</AnimatePresence>` con `motion.create(Box)` para poder seguir usando `sx` de MUI junto con `initial/animate/exit`. El padre pasa `onDismiss` (timeout o click en X) en vez de `onClose`, y sigue el patrón `open={visible}` sin gate condicional — AnimatePresence maneja el desmontaje real. Para transiciones entre DOS variantes de contenido (ej. Asistente abierto/cerrado) usar `<AnimatePresence mode="wait">` con `key` distinta por variante | FeedbackToast, AsistenteComposer — migración a `motion/react` |
| 2026-07-08 | **Layout robusto para "el toast debe estar exactamente N px arriba de otro elemento" sin medir píxeles a mano**: en vez de posicionar ambos elementos con `position:absolute` y calcular offsets por prueba y error, envolver ambos en un contenedor `position:absolute` (anclado solo por `bottom:0`) con `display:flex; flexDirection:column; alignItems:center; gap:'Npx'`. El último hijo (el elemento de referencia, ej. el composer) siempre queda pegado al fondo del contenedor sin importar si el hermano de arriba (el toast) está presente o no, porque el contenedor se auto-dimensiona a su contenido (shrink-to-fit) — no hace falta `justifyContent` ni recalcular nada cuando el toast aparece/desaparece | FeedbackAsistentePage — dock Toast+AsistenteComposer |
| 2026-07-08 | **Comportamiento "el feedback colapsa al asistente y lo reabre al descartarse"**: NO usar un callback `onExited` para decidir cuándo reabrir — con el layout de dock (lección anterior) basta derivar el variant del composer directamente del estado `visible` del toast: `variant = visible ? 'closed' : (asistenteOpen ? 'open' : 'closed')`. Esto colapsa el asistente INMEDIATAMENTE cuando se dispara un nuevo toast (no espera la animación de entrada) y lo reabre en cuanto se pide el dismiss (no espera el fin de la animación de salida) — el resultado es un crossfade simultáneo entre ambas animaciones de `motion`, más fluido que esperar secuencialmente | FeedbackAsistentePage — composerVariant derivado |
| 2026-07-08 | **"Fondo glass" en el dock inferior**: no es blur real de Figma (Figma solo tenía un gradient-to-transparent), pero el diseñador pidió explícitamente un efecto glassmorphism. Implementado con `background: linear-gradient(to top, alpha(background.default, 0.9) 35%, alpha(background.default, 0) 100%)` + `backdropFilter: 'blur(6px)'` (+ prefijo `WebkitBackdropFilter` para Safari) sobre el contenedor del dock — el contenido de la tabla detrás se ve desenfocado y se funde con el fondo en vez de cortarse abruptamente | FeedbackAsistentePage — dock background |
| 2026-07-09 | **CRÍTICO — `motion`/`framer-motion` anima `transform` escribiendo un inline `style.transform` propio, que SOBRESCRIBE cualquier `transform` puesto vía `sx` en el mismo elemento**. Centrar un elemento animado con la técnica clásica `left:'50%', transform:'translateX(-50%)'` se rompe en cuanto ese mismo componente recibe `initial/animate/exit` de motion (aunque sea solo `opacity`+`y`) — motion pisa el `translateX(-50%)` con su propio `translateY(...)`, dejando el elemento con el borde izquierdo en el centro del contenedor en vez de centrado. Detectado por el usuario ("no se ve centrado") y confirmado midiendo `getBoundingClientRect()` (el `left` medido coincidía exactamente con el centro del contenedor). **Fix**: nunca combinar `transform` de `sx` con motion en el mismo nodo — envolver el componente animado en un `Box` NO-motion que haga el `position:absolute; left:50%; transform:translateX(-50%)`, y dejar que el hijo animado por motion solo controle su propio tamaño/contenido. El patrón de dock flex+gap (lección anterior) no sufre esto porque no usa `transform` para centrar | ConsolaFeedbackDemo — toast descentrado en Floating bar/Genérico |
| 2026-07-09 | **Un ícono "cercano pero no fiel" casi siempre significa que se usó un ícono de una librería genérica (Tabler) en vez del asset exacto de Figma**. El botón "Asistente" de Consola de Contabilización parecía un ícono de chat (`IconMessageCircle2`) pero el asset real de Figma es un glyph de marca IA distinto ("chart-bubble": 3 círculos concéntricos de tamaño decreciente, color `#2F43D0`, no es parte de ningún set de Tabler). **Regla**: cuando un ícono es específico de una feature de marca (no un ícono UI genérico como flechas/chevrons/cerrar), descargar el asset SVG real de Figma (`get_design_context` da la URL) y **embeberlo verbatim** como componente inline en vez de aproximar con la librería de iconos del proyecto — la aproximación nunca es pixel-exacta para glyphs custom | IconAsistenteBubble — nodo 82:23916 |
| 2026-07-09 | **CRÍTICO — la misma trampa de `motion` pisando `transform` (ver lección del toast descentrado) también rompe posicionamiento vía `translate(±50%, ±50%)` en CUALQUIER `motion.div`/`motion.create()` que anime `scale`/`x`/`y`, no solo cuando se combina con `sx`**. El botón de cierre (X) del toast usaba `top:0,right:0,transform:'translate(50%,-50%)'` en el `style` del `motion.div` — motion terminó dejando `transform:'none'` (verificado con `getComputedStyle`), y el botón quedó pegado en la esquina en vez de centrado sobre ella. **Fix definitivo**: para posicionar un elemento animado por motion de forma que su CENTRO caiga en un punto exacto de su contenedor, nunca usar `transform` para ese propósito — calcular `top`/`right`/`left`/`bottom` en píxeles negativos directamente (`top: -mitad_alto + offsetY`, `right: -mitad_ancho + offsetX`), ya que motion solo administra `transform`, nunca `top/right/left/bottom`. **Para calibrar el offset exacto contra Figma**: comparar la captura de Figma (estado sin hover, para tener una esquina "limpia" sin el botón superpuesto) contra la captura con hover, midiendo con Python/PIL el centroide de píxeles oscuros (el ícono X) vs la bounding-box de la pill — mucho más confiable que interpretar los `left/top/translate` que exporta el MCP de Figma (que a menudo no son reconstruibles literalmente) | FeedbackToast close button — offset final `top:-3, right:-11` (centro 8px por debajo de la esquina) |
