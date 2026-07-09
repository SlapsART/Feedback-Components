# revisar-implementacion

Compara la implementación contra el diseño Figma nodo a nodo y produce un delta con score de fidelidad.

**Argumentos:** `$ARGUMENTS`
- Arg 1 (requerido): ruta al archivo `definitions/figma-pages/*.md`
- Arg 2+ (opcional): instrucciones específicas de corrección a priorizar

```
/revisar-implementacion definitions/figma-pages/tributo.md
/revisar-implementacion definitions/figma-pages/tributo.md El chip Inactivo tiene color equivocado
```

---

## Criterio de fidelidad

| Score | Criterio |
|-------|----------|
| 100 | Pixel-perfect: colores exactos, spacing ±0px, tipografía exacta, todos los estados |
| 90–99 | Diferencias ≤1px, no perceptibles al usuario |
| 80–89 | Diferencias visibles pero layout correcto |
| < 80 | Diferencias estructurales: layout roto, componente equivocado, estado faltante |

El loop solo para cuando todos los componentes tienen score = 100.

---

## Paso 0 — Leer estado y filtrar qué revisar

1. Lee `definitions/.project-config.json` → ruta real del theme
2. Lee `definitions/.loop-state.json`:
   - `"status": "reused"` → **SALTAR** (score 100 garantizado)
   - `"status": "accepted-delta"` → **SALTAR** (aceptado por el diseñador)
   - `"status": "implemented"` con `score: null` → revisar completo
   - `"status": "reviewed"` con `score < 100` → revisar solo el delta pendiente
3. Lee `definitions/figma-to-code-workflow.md` → lecciones aprendidas
4. Si hay instrucciones en los argumentos: priorízalas

---

## Paso 1 — Captura en paralelo

Para cada componente a revisar:

```
# Figma — usar caché si existe en definitions/.figma-cache/{node-id}-screenshot.png
get_screenshot → {URL del diseño Figma}

# Implementación
browser_navigate → {ruta desde devRoutes en .project-config.json}
browser_take_screenshot
```

Guardar screenshot de Figma en caché para no volver a pedirlo en iteraciones siguientes.

---

## Paso 2 — Resolución de tokens del theme (SIEMPRE antes de comparar colores)

MUI 7 usa CSS variables internamente. Antes de comparar cualquier color, tipografía o spacing contra el Figma, resolver los valores reales usando los archivos del theme.

### 2a. Obtener el valor computado y resolver CSS variables

```javascript
// Función universal de resolución — usar siempre para colores
const rootStyles = getComputedStyle(document.documentElement);

const resolveValue = (rawValue) => {
  // Si es una CSS variable, resolverla
  const match = rawValue.match(/var\((--[^,)]+)(?:,\s*([^)]+))?\)/);
  if (!match) return rawValue;
  const resolved = rootStyles.getPropertyValue(match[1]).trim();
  // Si el valor resuelto también es una variable, resolver recursivamente
  if (resolved.startsWith('var(')) return resolveValue(resolved);
  return resolved || match[2] || rawValue; // fallback al valor default si no resuelve
};

const el = document.querySelector('{selector}');
const computed = getComputedStyle(el);

return {
  backgroundColor: resolveValue(computed.backgroundColor),
  color:           resolveValue(computed.color),
  borderColor:     resolveValue(computed.borderColor),
  outlineColor:    resolveValue(computed.outlineColor),
};
```

### 2b. Buscar el token en los archivos del theme

Cuando el valor resuelto no coincide con el del Figma, buscar el token correcto directamente en el theme:

```bash
# Buscar por valor hex del Figma
grep -rn "{valor-hex-del-figma}" src/app/styles/theme/ --include="*.ts" --include="*.json"

# Buscar por nombre semántico (si el Figma usa nombres como "primary", "error", etc.)
grep -rn "{nombre-semantico}" src/app/styles/theme/ --include="*.ts"
```

Si el token existe en el theme con el valor correcto pero el componente no lo usa → corregir el componente para que use el token correcto del theme.

Si el token en el theme tiene un valor incorrecto → actualizar el valor en el archivo del theme correspondiente (`baseTheme.ts`, `cosmosLightTheme.ts`, o `cosmosDarkTheme.ts` según corresponda).

**La corrección siempre va al archivo del theme, nunca a un valor hardcodeado en el componente.**

---

## Paso 3 — Análisis nodo a nodo completo

Analiza en orden de mayor a menor impacto. Usar siempre `resolveValue` para colores.

### Layout estructural
```javascript
const el = document.querySelector('{selector}');
const s = getComputedStyle(el);
return {
  display:        s.display,
  flexDirection:  s.flexDirection,
  gap:            s.gap,
  padding:        s.padding,
  alignItems:     s.alignItems,
  justifyContent: s.justifyContent,
};
```

### Colores y tokens (con resolución de variables)
```javascript
const el = document.querySelector('{selector}');
const s = getComputedStyle(el);
return {
  backgroundColor: resolveValue(s.backgroundColor),
  color:           resolveValue(s.color),
  borderColor:     resolveValue(s.borderColor),
};
```
Comparar contra los tokens del theme. Si difiere → buscar token correcto en el theme (Paso 2b).

### Tipografía
```javascript
const el = document.querySelector('{selector}');
const s = getComputedStyle(el);
return {
  fontFamily:  s.fontFamily,
  fontSize:    s.fontSize,
  fontWeight:  s.fontWeight,
  lineHeight:  s.lineHeight,
  letterSpacing: s.letterSpacing,
};
```
Si hay diferencia de tipografía: buscar en `src/app/styles/theme/base/baseTheme.ts` la definición del variant correspondiente y corregir ahí.

### Spacing exacto
```javascript
const el = document.querySelector('{selector}');
const rect = el.getBoundingClientRect();
const s = getComputedStyle(el);
return {
  width:       rect.width,
  height:      rect.height,
  paddingTop:  parseFloat(s.paddingTop),
  paddingLeft: parseFloat(s.paddingLeft),
  marginTop:   parseFloat(s.marginTop),
  gap:         parseFloat(s.gap) || 0,
};
```

### Componentes y variantes
- ¿Componente MUI correcto?
- ¿Todos los estados implementados? (hover, disabled, error, loading)
- ¿Border-radius, box-shadow, outline correctos?

Para border-radius y sombras: buscar primero en el theme antes de hardcodear:
```bash
grep -rn "borderRadius\|boxShadow" src/app/styles/theme/ --include="*.ts"
```

### Iconos
- ¿Nombre Tabler exacto?
- ¿Tamaño correcto?
- ¿Color correcto? (usar `resolveValue` para comparar)

---

## Paso 4 — Calcular score

| Severidad | Puntos descontados | Ejemplos |
|-----------|-------------------|----------|
| Crítica | −15 a −25 | Layout roto, componente equivocado, estado faltante |
| Alta | −5 a −10 | Token incorrecto, padding off > 4px |
| Media | −2 a −4 | Font-weight incorrecto, gap off 2–4px |
| Baja | −1 | Diferencia ≤1px |

Score = 100 − suma (mínimo 0).

---

## Paso 5 — Aplicar correcciones

Prioridad: instrucciones del argumento → crítica → alta → media → baja.

```
Utiliza @definitions/figma-to-code-workflow.md
Corrige en {archivo del theme o componente}: {descripción exacta}
Valor Figma: {valor} | Valor actual resuelto: {valor}
```

Jerarquía de corrección (en orden, nunca saltarse):
1. **Diferencia de token** → buscar y corregir en el archivo del theme correcto
2. **Diferencia de implementación** → corregir el componente para usar el token del theme
3. **Diferencia intencional** → comentar `// DESIGN-DECISION: {razón}` en el componente

Nunca hardcodear valores de color, tipografía o spacing en componentes.
Siempre referenciar desde el theme o los tokens.

---

## Paso 6 — Build check y actualizar estado

```bash
bun run build 2>&1
```

Actualizar `definitions/.loop-state.json`:
```json
"{component-slug}": {
  "status": "reviewed",
  "score": 92,
  "scoreAnterior": 85,
  "issues": [
    {
      "severity": "alta",
      "description": "color de fondo del chip Inactivo incorrecto",
      "figmaValue": "#E0E0E0",
      "currentValueRaw": "var(--mui-palette-grey-300)",
      "currentValueResolved": "#E0E0E0",
      "themeFile": "src/app/styles/theme/base/baseTheme.ts",
      "resolved": true
    }
  ],
  "buildOk": true
}
```

El campo `scoreAnterior` permite al loop detectar si hubo mejora entre iteraciones.

---

## Paso 7 — Reporte delta

```
=== REVISION DELTA ===
Iteración: {N}
Revisados: {lista} | Omitidos: {lista (reused/accepted)}

| Componente      | Score   | Anterior | Issues pendientes               |
|----------------|---------|----------|--------------------------------|
| pagina-base    | 92/100  | 85/100   | 1 (gap header 18px vs 20px)    |
| drawer-nuevo   | 100/100 | 94/100   | —                               |
| dialog-confirm | 100/100 | 100/100  | —                               |

Convergencia: NO — 1 componente bajo 100
Mejora detectada: SÍ — pagina-base subió de 85 a 92
=== FIN DELTA ===
```

---

## Paso 8 — Limpieza

```bash
rm -f .playwright-mcp/*.png .playwright-mcp/*.jpeg .playwright-mcp/*.yml .playwright-mcp/*.log 2>/dev/null
```
