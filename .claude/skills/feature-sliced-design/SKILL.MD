---
name: feature-sliced-design
description: Aplica Feature-Sliced Design al generar o validar estructura de código
---

# Feature-Sliced Design (FSD) — Reglas para generación de código

Sigue estas reglas estrictamente al crear archivos, carpetas o imports.

## Layers (orden fijo, dependencias solo hacia abajo)

```
app → pages → widgets → features → entities → shared
```

| Capa | Responsabilidad | Slices |
|------|----------------|:------:|
| `app/` | Providers, router, tema, entry point | No |
| `pages/` | Composición de widgets y features por ruta | Si |
| `widgets/` | Bloques grandes autónomos de UI | Si |
| `features/` | Acciones del usuario con valor de negocio | Si |
| `entities/` | Entidades del dominio de negocio | Si |
| `shared/` | Código reutilizable sin lógica de negocio | No |

## Reglas de dependencia

| Desde ↓ / Hacia → | app | pages | widgets | features | entities | shared |
|-------------------|:---:|:-----:|:-------:|:--------:|:--------:|:------:|
| **app**           | —   | ✅    | ✅      | ✅       | ✅       | ✅     |
| **pages**         | ❌  | —     | ✅      | ✅       | ✅       | ✅     |
| **widgets**       | ❌  | ❌    | —       | ✅       | ✅       | ✅     |
| **features**      | ❌  | ❌    | ❌      | —        | ✅       | ✅     |
| **entities**      | ❌  | ❌    | ❌      | ❌       | —        | ✅     |
| **shared**        | ❌  | ❌    | ❌      | ❌       | ❌       | —      |

- Slices del mismo layer NUNCA se importan entre sí.
- Dentro del mismo slice usar rutas relativas.
- Entre slices/layers usar alias `@/`.

## Segments (dentro de cada slice)

| Segmento | Contenido |
|----------|-----------|
| `ui/` | Componentes React (solo JSX y presentación) |
| `hooks/` | Custom hooks con lógica de estado, efectos y orquestación (`useX`) |
| `model/` | Estado (stores), tipos, lógica de negocio |
| `api/` | HTTP calls, queries, mutations |
| `lib/` | Helpers puros y funciones utilitarias (sin hooks) |
| `config/` | Constantes, enums |

Solo crear los segmentos necesarios.

> **`hooks/` vs `lib/`**: NUNCA mezclar. Hooks (`useX`) van en `hooks/`. Funciones puras sin estado van en `lib/`.

## Public API

Cada slice DEBE tener un `index.ts` que exporta solo lo público:

```typescript
// ✅ Importar desde public API
import { ObligacionCard } from '@/entities/obligacion';

// ❌ NUNCA importar archivos internos directamente
import { ObligacionCard } from '@/entities/obligacion/ui/ObligacionCard';
```

## Componentes delgados y hooks

Los componentes en `ui/` deben ser **delgados**: solo JSX y presentación. Toda la lógica (estado, efectos, validaciones, orquestación) se extrae a custom hooks en `hooks/`.

```typescript
// ❌ MAL — componente gordo con lógica
export function MiPage() {
  const [data, setData] = useState(...);
  const mutation = useMutation(...);
  useEffect(() => { ... }, [...]);
  const handleSubmit = () => { ... };
  return <Form onSubmit={handleSubmit} />;
}

// ✅ BIEN — componente delgado + hook
// hooks/useMiPage.ts
export function useMiPage() {
  const [data, setData] = useState(...);
  const mutation = useMutation(...);
  useEffect(() => { ... }, [...]);
  const handleSubmit = () => { ... };
  return { data, handleSubmit, ... };
}

// ui/MiPage.tsx
export function MiPage() {
  const { data, handleSubmit } = useMiPage();
  return <Form onSubmit={handleSubmit} />;
}
```

**Excepciones**: estado visual trivial (toggle de un menú, hover) puede quedarse en `ui/`.

## Zustand stores — cuándo usar y buenas prácticas

### Cuándo usar Zustand (en vez de useState/callbacks)

| Usar Zustand | Usar useState local |
|---|---|
| Estado de formulario que la **page necesita leer** al enviar (guardar/completar) | Estado visual trivial (anchor de menú, toggle, hover) |
| Estado compartido entre **componentes hermanos** sin prop drilling | Estado que solo consume el componente que lo crea |
| Estado que necesita ser leído desde **fuera del árbol React** (ej: `getState()` en handlers) | Estado efímero (animación, scroll position) |
| **>3 callbacks** de sincronización entre componente hijo → padre | 1-2 callbacks simples entre padre/hijo |

### Regla de decisión rápida

> Si un componente hijo tiene `useState` y la page necesita ese valor para un `mutation.mutate()`, **usa Zustand**. Si no, `useState` local está bien.

### Ubicación del store en FSD

- **Stores de feature** → `features/{slice}/model/{slice}.store.ts`
- **Stores compartidos** → `shared/model/{nombre}.store.ts`
- **NUNCA** crear stores en `ui/`, `hooks/`, `lib/` o `config/`

### Convenciones

```typescript
// features/registrar-compra/model/registro-compra.store.ts
import { create } from 'zustand';

interface MiFeatureState {
  // State
  campo: string;
  items: Item[];
  // Actions
  setCampo: (v: string) => void;
  setItems: (items: Item[]) => void;
  reset: () => void;
}

export const useMiFeatureStore = create<MiFeatureState>((set) => ({
  campo: '',
  items: [],
  setCampo: (campo) => set({ campo }),
  setItems: (items) => set({ items }),
  reset: () => set({ campo: '', items: [] }),
}));
```

### Integración con hooks existentes

Los hooks en `hooks/` sincronizan estado local → store. El componente `ui/` no sabe que el store existe:

```typescript
// hooks/useFormulario.ts — sincroniza al store
const [valor, _setValor] = useState(initial);
const setStoreField = useMiStore((s) => s.setCampo);
const setValor = (v: string) => { _setValor(v); setStoreField(v); };

// pages/mi-page.ts — lee del store para enviar
const buildBody = () => {
  const { campo, items } = useMiStore.getState();
  return { campo, items };
};
```

### Anti-patrones

- **NO** leer del DOM con `querySelector` para obtener valores de formulario — usar store
- **NO** crear un store global para todo — un store por feature/formulario
- **NO** suscribirse al store completo — usar selectores: `useStore((s) => s.campo)`
- **NO** poner lógica de negocio en el store — solo estado y setters simples

## Nombrado

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Carpetas | `kebab-case` | `crear-obligacion/` |
| Componentes | `PascalCase.tsx` | `ObligacionCard.tsx` |
| Stores | `.store.ts` | `obligacion.store.ts` |
| Tipos | `.types.ts` | `obligacion.types.ts` |
| Queries | `.queries.ts` | `obligacion.queries.ts` |
| Mutations | `.mutation.ts` | `crear-obligacion.mutation.ts` |
| Schemas | `.schema.ts` | `crear-obligacion.schema.ts` |
| Constantes | `.constants.ts` | `obligacion.constants.ts` |
| Tests | `.test.tsx` | `ObligacionCard.test.tsx` |

## Nombrado de slices

| Capa | Convención | Ejemplos |
|------|-----------|----------|
| `pages/` | Sustantivo | `obligaciones`, `pagos` |
| `widgets/` | Sustantivo compuesto | `obligaciones-table`, `dashboard-resumen` |
| `features/` | Verbo + sustantivo | `crear-obligacion`, `aprobar-pago` |
| `entities/` | Sustantivo singular | `obligacion`, `proveedor`, `pago` |

## Scaffolding de un slice nuevo

```
{layer}/{slice-name}/
├── ui/
│   └── {SliceName}.tsx
├── hooks/              # si necesita custom hooks con estado/efectos
│   └── use{SliceName}.ts
├── model/              # si necesita estado o tipos
│   ├── {slice-name}.types.ts
│   └── {slice-name}.store.ts
├── api/                # si necesita llamadas HTTP
│   └── {slice-name}.queries.ts | {slice-name}.mutation.ts
├── lib/                # si necesita helpers puros (NO hooks)
├── config/             # si necesita constantes
└── index.ts            # OBLIGATORIO — public API
```

## Queries van en entities, Mutations van en features

- `entities/*/api/` → queries (lectura): `queryOptions`, `useSuspenseQuery`
- `features/*/api/` → mutations (escritura): `useMutation`

## Nombres claros y sin ambigüedades

Los nombres deben ser **descriptivos y autoexplicativos**. Si otro desarrollador no entiende qué hace el componente solo leyendo su nombre, el nombre es incorrecto.

**Evitar:**
- Jerga visual: "Pill", "Bone", "Wrapper", "Container" genérico
- Nombres genéricos: "Item", "Content", "View" sin contexto
- Abreviaciones: "Btn", "Hdr", "Ftr"

| ❌ Ambiguo | ✅ Descriptivo | Razón |
|---|---|---|
| `TotalPill` | `TotalResumen` | "Pill" es jerga visual |
| `ViewHeader` | `CompraViewHeader` | Necesita contexto del dominio |
| `Item` | `ConceptoRow` | No dice qué dato representa |
| `Content` | `FormularioComercio` | No describe qué contiene |

## Máximo de componentes por archivo

Cada `.tsx` puede tener **hasta 4 componentes React** (1 export principal + hasta 3 helpers privados como cell renderers). Si supera ese límite, extraer a archivos separados en el mismo `ui/`. Validar con `scripts/check-single-component.sh`.

## Errores que NUNCA debes cometer

- Lógica de negocio en `shared/`
- Feature que importa de otro feature
- Entity que importa de feature
- Página con lógica compleja (solo compone)
- Import sin pasar por `index.ts`
- Entities = sustantivos, Features = verbos
- Nombres ambiguos o con jerga visual
- Lógica compleja en `ui/` (extraer a `hooks/`)
- Hooks en `lib/` o helpers puros en `hooks/` (no mezclar)

## Principios SOLID en React

| Principio | Aplicación en React/FSD | Ejemplo |
|-----------|------------------------|---------|
| **S — Single Responsibility** | Un hook = una responsabilidad. Un componente = una vista. Si un hook supera ~200 líneas o maneja más de un flujo, dividir. | `useRadicacionCompra` maneja guardado, descarte, devolución → candidato a dividir |
| **I — Interface Segregation** | Props interfaces pequeñas y enfocadas. No pasar objetos completos cuando solo se necesitan 2-3 campos. Dividir interfaces grandes. | ❌ `data: Borrador` como prop → ✅ `monto: number, tercero: string` |
| **D — Dependency Inversion** | Ya cubierto por FSD: capas superiores dependen de abstracciones (interfaces/types de capas inferiores), nunca al revés. Hooks reciben callbacks, no implementaciones concretas. | `useAutoSave({ save })` recibe función genérica, no conoce endpoints |

> **L — Liskov Substitution**: Poco aplicable en componentes React. Se cubre indirectamente al respetar los contratos de props de componentes base.

## Buenas prácticas React 19

El proyecto usa **React 19 + React Compiler**. El compiler memoiza automáticamente componentes, hooks y valores derivados — lo siguiente es idiomático para esta versión.

### 1. Derivar estado, no sincronizar

Calcular valores derivados directamente en el render. NO usar `useEffect` + `setState` para mantener valores sincronizados.

```typescript
// ❌ MAL — sincronizar con useEffect
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${nombre} ${apellido}`);
}, [nombre, apellido]);

// ✅ BIEN — derivar en render
const fullName = `${nombre} ${apellido}`;
```

### 2. `useEffect` solo para side-effects reales

| Usar `useEffect` ✅ | NO usar `useEffect` ❌ |
|---|---|
| Suscripciones (WebSocket, ResizeObserver, event listeners) | Transformar datos para renderizar |
| Sincronizar con sistemas externos (DOM API, `localStorage`, SignalR) | Calcular estado derivado de props/estado |
| Fetch inicial de datos (preferir React Query) | Resetear estado cuando cambia una prop |
| Timers (`setInterval`, `setTimeout`) | Filtrar/ordenar una lista |

```typescript
// ❌ MAL — useEffect para transformar datos
const [filtered, setFiltered] = useState([]);
useEffect(() => {
  setFiltered(items.filter(i => i.active));
}, [items]);

// ✅ BIEN — derivar inline
const filtered = items.filter(i => i.active);
```

### 3. Nunca llamar `setState` dentro de un `useEffect` (regla `react-hooks/set-state-in-effect`)

Llamar `setState` dentro del cuerpo de un effect dispara **renders en cascada**: el primer render se pinta con datos inconsistentes, luego el effect corre, luego un segundo render. Es el principal causante de "parpadeos" en UI.

**Patrón oficial React 19: "adjust state during render"**

Cuando necesites resetear/reseeding estado local ante un cambio de prop o estado externo, comparar contra el valor previo **durante el render**. Si llamas `setState` durante el render, React **descarta** el render actual (no lo pinta) y reintenta inmediatamente — 0 parpadeos, 0 cascadas.

```typescript
// ❌ MAL — useEffect + setState
useEffect(() => {
  if (agregado && !initialized) {
    setInitialized(true);
    setMedioPago(agregado.medioPago);
    setMonto(agregado.valorMonetario.valor);
  }
}, [agregado, initialized]);

// ✅ BIEN — adjust during render con trigger
const [initialized, setInitialized] = useState(false);
if (agregado && !initialized) {
  setInitialized(true);              // flag trigger: evita loop infinito
  setMedioPago(agregado.medioPago);
  setMonto(agregado.valorMonetario.valor);
}
```

**Regla del trigger:** necesitas un valor almacenado (`initialized`, `prevX`) que cambie en la misma pasada para que el `if` sea `true` **una sola vez**:

```typescript
const [prev, setPrev] = useState(valorExterno);
if (valorExterno !== prev) {
  setPrev(valorExterno);
  // ...reaccionar al cambio una sola vez
}
```

Alternativa preferida: mover la lógica al **lugar que causa el cambio** (el callback/acción que modifica el store), evitando por completo tener que reaccionar al cambio.

### 4. No mutar ni leer refs durante el render (regla `react-hooks/refs`)

`ref.current = value` (escritura) **y** `ref.current` (lectura) durante el render son anti-patrones: bloquean optimizaciones de Concurrent React y causan que el componente no se actualice.

**Caso A — "Latest ref" para callbacks estables**

Este patrón guarda siempre la última versión de un callback sin volver a re-suscribir al event listener:

```typescript
// ❌ MAL — escritura en render
const onMessageRef = useRef(onMessage);
onMessageRef.current = onMessage;

// ✅ BIEN — escritura dentro de effect sin deps (corre después de cada render)
const onMessageRef = useRef(onMessage);
useEffect(() => {
  onMessageRef.current = onMessage;
});
```

El ref solo se lee dentro de handlers/effects (nunca en render), donde siempre verá el valor más reciente.

**Caso B — Ref usado como `anchorEl` / valor DOM que el JSX consume**

Cuando necesitas pasar un nodo DOM a una prop (ej: `anchorEl` de MUI Popper), **no uses `ref.current` en el JSX**. Usa **callback ref + `useState`**: el estado dispara un re-render cuando el nodo se monta, y puedes pasarlo como prop normal.

```typescript
// ❌ MAL — leer ref.current en render
const anchorRef = useRef<HTMLDivElement>(null);
return (
  <>
    <Box ref={anchorRef}>...</Box>
    <Popper anchorEl={anchorRef.current} />  {/* ← error */}
  </>
);

// ✅ BIEN — callback ref con useState
const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
return (
  <>
    <Box ref={setAnchor}>...</Box>
    <Popper anchorEl={anchor} />
  </>
);
```

React llama `setAnchor(element)` cuando el `Box` se monta y `setAnchor(null)` cuando se desmonta — idiomático en React 19.

**Regla general:** los refs solo deben leerse/escribirse en **effects o event handlers**, nunca en el cuerpo del render. Si necesitas el valor del ref en el JSX, casi siempre quieres `useState` + callback ref.

### 5. React Compiler: NO memoizar manualmente

El proyecto usa `babel-plugin-react-compiler`. **No agregar `useMemo`, `useCallback` ni `React.memo`** salvo que el compiler lo pida explícitamente (warning `Compilation Skipped`). El compiler detecta y memoiza automáticamente.

```typescript
// ❌ INNECESARIO — el compiler lo hace solo
const sorted = useMemo(() => items.sort(...), [items]);
const handleClick = useCallback(() => {...}, [dep]);

// ✅ BIEN — dejar que el compiler memoice
const sorted = items.sort(...);
const handleClick = () => {...};
```

Si ves el warning `Compilation Skipped: Existing memoization could not be preserved`, significa que el `useMemo`/`useCallback` existente confunde al compiler — **eliminarlo**, no ajustarlo.

### 6. `ref` como prop (ya no `forwardRef`)

React 19 permite pasar `ref` como prop normal. **No usar `forwardRef`** en código nuevo.

```typescript
// ❌ Viejo (React 18)
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} {...props} />
));

// ✅ React 19
function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}
```

### 7. Context como provider (sin `.Provider`)

```typescript
// ❌ Viejo
<MyContext.Provider value={value}>...</MyContext.Provider>

// ✅ React 19
<MyContext value={value}>...</MyContext>
```

### 8. Form Actions, `useActionState`, `useOptimistic`

Para formularios con submit asíncrono, preferir **Actions** sobre `useState` + `onSubmit` manual:

```typescript
const [state, submitAction, isPending] = useActionState(
  async (prev, formData) => {
    return await guardarCompra(formData);
  },
  null,
);

return <form action={submitAction}>...</form>;
```

Para updates optimistas (ej: marcar como pagado mientras se confirma en backend):

```typescript
const [optimisticItems, addOptimistic] = useOptimistic(items, reducer);
```

En este proyecto las mutaciones siguen usando **React Query** (`useMutation`), que ya provee `isPending`/`mutateAsync`. Reservar Actions para formularios simples sin cache de server state.

### 9. `use()` para leer promesas y contextos

Permite leer valores condicionalmente (algo imposible con `useContext`):

```typescript
// En un Suspense boundary
const data = use(promise);       // suspende hasta resolver
const theme = use(ThemeContext); // puede ir dentro de if
```

### 10. Convenciones de naming para eventos

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Props de callback | `onX` | `onSubmit`, `onChange`, `onDevolver` |
| Handlers internos | `handleX` | `handleSubmit`, `handleChange` |
| Booleanos | `isX` / `hasX` | `isLoading`, `hasError`, `isPending` |
| Estado de UI | `xOpen` / `xAnchor` | `menuOpen`, `dialogAnchor` |

## Reglas de lint críticas (ESLint `react-hooks/*`)

Estas reglas son errores, no warnings — bloquean el build:

| Regla | Qué prohíbe | Fix |
|---|---|---|
| `react-hooks/set-state-in-effect` | `setState` síncrono dentro de `useEffect` | Usar "adjust state during render" o mover lógica al callback que causa el cambio |
| `react-hooks/refs` | `ref.current = x` durante render | Mover la mutación a un `useEffect` |
| `react-hooks/exhaustive-deps` | Dependencias faltantes/extras en `useEffect`/`useMemo` | Incluir todas las deps o refactorizar para no necesitarlas |
| `react-refresh/only-export-components` | Exportar no-componentes junto a componentes en un archivo `.tsx` | Mover constantes/helpers a `lib/` o a un archivo separado |

**`react-refresh/only-export-components`**: un archivo `.tsx` debe exportar SOLO componentes. Si necesitas exportar un tipo, constante o helper junto con el componente, muévelos a otro archivo:

```typescript
// ❌ MAL — Toast.tsx exporta componente + helper
export function Toast() {...}
export function useToast() {...}   // ← error

// ✅ BIEN — separar
// ui/Toast.tsx           → export function Toast()
// hooks/useToast.ts      → export function useToast()
```
