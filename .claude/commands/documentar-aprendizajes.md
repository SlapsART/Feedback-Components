# documentar-aprendizajes

Documenta en `definitions/figma-to-code-workflow.md` las lecciones aprendidas durante la sesión actual.

Llamado automáticamente por `/loop-implementar` al alcanzar 100% en todos los componentes.
También puedes invocarlo manualmente al cerrar cualquier sesión de trabajo.

---

## Paso 1 — Identificar lecciones nuevas

Repasa la conversación reciente y los issues en `definitions/.loop-state.json` buscando:

- Problemas que requirieron más de una iteración para resolverse
- Comportamientos inesperados de MUI 7, React 19 o el theme
- Diferencias Figma → código que costaron tiempo detectar
- Patrones de Figma que generaron confusión al clasificar
- Cualquier convención que habría ahorrado iteraciones si se hubiera conocido antes

**Fuente primaria:** issues con severidad `alta` o `crítica` en `.loop-state.json` que se repitieron en más de un componente.

---

## Paso 2 — Verificar duplicados

Lee la tabla `## Lecciones Aprendidas` en `definitions/figma-to-code-workflow.md`.

- Si una lección ya existe: amplíala en lugar de duplicarla
- Si es nueva: agrégala al final

---

## Paso 3 — Redactar cada lección

```
| {YYYY-MM-DD} | **{Título conciso}.** {Por qué ocurre el problema}. Fix: `{patrón o snippet correcto}`. | {página/componente donde ocurrió} |
```

Una buena lección tiene:
- **Título** claro en ≤10 palabras
- **Por qué** ocurre (no solo qué pasó)
- **Fix** concreto: código, nombre de token, selector CSS o convención
- **Contexto** para que sea trazable

---

## Paso 4 — Actualizar estado

```json
{ "done": true, "completedAt": "{ISO_TIMESTAMP}", "lessonsDocumented": {N} }
```

Confirma: cuántas lecciones nuevas se agregaron y de qué componente/página vienen.
