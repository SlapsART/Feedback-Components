# loop-implementar

Orquesta el ciclo completo de implementación → revisión automática → gate humano → iteración hasta >= 95%.

**Llamado internamente por el orquestador (CLAUDE.md). También puede invocarse manualmente.**

**Argumentos:** `$ARGUMENTS`
- Arg 1 (requerido): ruta al archivo `definitions/figma-pages/*.md`
- Flag `--reset` (opcional): borra el estado previo e inicia desde cero

---

## Principio de mínimo token

Cada iteración trabaja solo con el delta de lo que cambió o sigue fallando.
No re-lee el diseño completo. No re-analiza componentes >= 95. No re-fetcha nodos cacheados.
El estado persiste en `definitions/.loop-state.json` entre pasos.

---

## Schema del estado

```json
{
  "page": "definitions/figma-pages/{slug}.md",
  "iteration": 0,
  "internalIterations": 0,
  "startedAt": "",
  "lastUpdated": "",
  "done": false,
  "components": {
    "{slug}": {
      "status": "pending|implemented|reviewed|reused|accepted",
      "machineScore": null,
      "humanScore": null,
      "humanScoreHistory": [],
      "issues": [],
      "buildOk": false
    }
  }
}
```

`humanScoreHistory` guarda todos los scores que dio el diseñador para este componente a lo largo de las iteraciones.

---

## Verificación inicial

```bash
[ -f "definitions/.project-config.json" ] && echo "ok" || echo "FALTA"
[ -f "$1" ] && echo "ok" || echo "FALTA"
```

Si alguno falta: el orquestador ya habrá manejado este caso. Informar en lenguaje simple y detener.

---

## Fase 0 — Inicializar o retomar estado

Si `--reset` o no existe estado: crear estado limpio con `iteration: 0`, `internalIterations: 0`.

Si existe estado:
- `done: true` → informar que ya completó
- Trabajo pendiente → retomar sin tocar componentes con `humanScore >= 95`
- Componentes con `humanScore < 95` → son los que hay que re-iterar

Cargar `definitions/component-registry.json` para tener en contexto los componentes existentes.

**Detección anticipada de globales:**
Cruzar todos los node-ids del `_index.json` contra todas las páginas. Si un nodo aparece en 2+ páginas, implementarlo en `src/shared/ui/` directamente.

---

## Fase 1 — Implementar (solo componentes con `status: pending`)

Para cada componente pendiente:

```
/component-registry --search "{node-id} {tipo}"
```

- **Match global o exacto** → reutilizar. `status: "reused"`, `humanScore: 100`. Skip.
- **Candidato similar (≥80%)** → adaptar.
- **Sin match** → implementar desde cero:

```
Implementa "{nombre}" del nodo: {URL}
Stack: React 19 + TypeScript 5.9 + MUI 7 + Tabler Icons
Theme: {ruta desde .project-config.json}/cosmosTheme.ts
Lecciones: definitions/figma-to-code-workflow.md
Feature-Sliced Design
```

Build check tras cada implementación:
```bash
bun run build 2>&1
```

Actualizar estado: `status: "implemented"`, `machineScore: null`.

---

## Fase 2 — Revisión automática interna (hasta 2 vueltas)

Esta fase es **invisible para el diseñador**. Se ejecuta máximo 2 veces por componente antes del gate humano.

### 2a. Verificar dev server

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 2>/dev/null \
  | grep -qE "^(200|301|302|304)$" && echo "ok" || echo "NO_RESPONDE"
```

Si no responde: solicitar al diseñador que corra `bun dev` antes de continuar con la revisión visual.

### 2b. Para cada componente con `machineScore: null` o `machineScore < 95`

**Captura:**
- Figma: `get_screenshot {URL}` — usar caché `definitions/.figma-cache/{node-id}-screenshot.png`
- Local: `browser_navigate {ruta desde devRoutes}` + `browser_take_screenshot`

**Resolución de CSS variables del theme** (siempre antes de comparar colores):
```javascript
const rootStyles = getComputedStyle(document.documentElement);
const resolveValue = (val) => {
  const match = val.match(/var\((--[^,)]+)(?:,\s*([^)]+))?\)/);
  if (!match) return val;
  const resolved = rootStyles.getPropertyValue(match[1]).trim();
  if (resolved.startsWith('var(')) return resolveValue(resolved);
  return resolved || match[2] || val;
};
```

**Análisis nodo a nodo** (mayor a menor impacto):
- Layout: flex direction, gap, padding, alignment
- Colores: bg, text, border, icon — siempre con `resolveValue`, siempre buscado en el theme
- Tipografía: family, size, weight, line-height
- Spacing: px exactos con `getBoundingClientRect`
- Variantes y estados: hover, disabled, error, loading
- Iconos: nombre Tabler exacto, tamaño, color

**Score interno:**
| Severidad | Descuento |
|-----------|-----------|
| Crítica | −15 a −25 |
| Alta | −5 a −10 |
| Media | −2 a −4 |
| Baja | −1 |

Score = 100 − suma (mínimo 0). Guardar en `machineScore`.

**Correcciones en el mismo paso:**
- Token del theme → corregir en el archivo del theme correcto, no en el componente
- Error de implementación → corregir el componente
- Diferencia intencional → comentar `// DESIGN-DECISION: {razón}`

Build check tras cada corrección:
```bash
bun run build 2>&1
```

### 2c. Evaluar si repetir la vuelta interna

```
si machineScore < 95 y internalIterations < 2:
  → incrementar internalIterations
  → volver al inicio de Fase 2

si machineScore >= 95 o internalIterations >= 2:
  → continuar a Fase 3 (gate humano)
```

Actualizar `.loop-state.json` con `machineScore` e `internalIterations` actuales.

---

## Fase 3 — Gate humano

Esta es la única interacción con el diseñador durante el loop.

Mostrar el resultado al diseñador (sin jerga técnica) y preguntar **una sola cosa**:

```
┌─────────────────────────────────────────┐
│  Implementé {nombre legible del         │
│  componente}.                           │
│                                         │
│  ¿De 0 a 100, qué tan fiel ves esto     │
│  al diseño original?                    │
│                                         │
│  (95 o más = perfecto para mí)          │
└─────────────────────────────────────────┘
```

Esperar respuesta. La respuesta puede ser:
- Solo un número: `"87"`, `"95"`, `"100"`
- Un número con comentario: `"70, el color del botón está mal"`, `"80 — el spacing del header no coincide"`

Parsear el número de la respuesta. El comentario, si existe, se usa como prioridad en la siguiente iteración.

Guardar en el estado:
```json
"humanScore": 87,
"humanScoreHistory": [87],
"humanComment": "el color del botón está mal"
```

### Si humanScore >= 95

```json
"status": "accepted",
"humanScore": 87
```

Confirmar en una línea y continuar con el siguiente componente:
*"Perfecto, {nombre} queda listo."*

### Si humanScore < 95

Iterar automáticamente — sin explicar, sin preguntar, solo hacer:

1. Usar `humanComment` (si lo dio) como prioridad máxima en las correcciones
2. Ejecutar Fase 2 completa de nuevo (hasta 2 vueltas internas más)
3. Al terminar: volver al inicio de Fase 3 con el mismo componente
4. Preguntar el score de nuevo

```json
"humanScoreHistory": [70, 85, 95]  ← historial de todas las evaluaciones humanas
```

**No hay límite de iteraciones mientras el humanScore sea < 95.**

---

## Fase 4 — Convergencia por pantalla

Cuando todos los componentes tienen `humanScore >= 95` o `status: "reused"`:

### Documentar lecciones (automático, sin avisar al diseñador)

```
Agrega a definitions/figma-to-code-workflow.md las lecciones de esta sesión.
Fuente: definitions/.loop-state.json — issues con severidad alta/crítica que requirieron múltiples iteraciones humanas.
```

### Registrar componentes nuevos

```
/component-registry --add {ruta}
```

Para los que el diseñador marcó como globales o que aparecen en 2+ páginas.

### Actualizar estado final

```json
{
  "done": true,
  "completedAt": "{ISO_TIMESTAMP}",
  "finalHumanScores": {
    "{componente}": 97,
    "{componente}": 100
  }
}
```

### Limpiar temporales

```bash
rm -f .playwright-mcp/*.png .playwright-mcp/*.jpeg .playwright-mcp/*.yml .playwright-mcp/*.log 2>/dev/null
```

### Comunicar al diseñador en una línea

*"{Nombre de la pantalla} implementada. ¿Seguimos con otra pantalla?"*

---

## Protección contra stall

Si el `humanScore` no supera el 85 después de 3 iteraciones humanas consecutivas (el score no sube más de 5 puntos entre evaluaciones):

```
┌─────────────────────────────────────────┐
│  Llevo {N} intentos en {componente}     │
│  y el score se mantiene en {score}.     │
│                                         │
│  La diferencia que no logro resolver:   │
│  {descripción visual sin jerga}         │
│                                         │
│  ¿Revisamos el diseño en Figma          │
│  o lo dejamos así?                      │
└─────────────────────────────────────────┘
```

- *"Revisar Figma"* → correr `/figma-extract {token} {url} --force` y reintentar
- *"Dejarlo así"* → `status: "accepted"`, documentar la diferencia como design decision, continuar
