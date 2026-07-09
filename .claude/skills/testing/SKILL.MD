---
name: testing
description: Genera y valida tests siguiendo las convenciones del proyecto (Vitest + RTL + MSW)
---

# Testing — Reglas para generacion de tests

Sigue estas reglas estrictamente al crear o modificar archivos de test.

## Stack de testing

| Herramienta | Uso |
|-------------|-----|
| **Vitest** | Test runner y assertions |
| **React Testing Library (RTL)** | Renderizado y queries de componentes |
| **userEvent** | Simulacion de interacciones de usuario |
| **MSW** | Mock de peticiones HTTP |

## Convenciones de archivos

| Tipo | Nombre | Ubicacion |
|------|--------|-----------|
| Componente / Pagina | `{Component}.spec.tsx` | Junto al componente en `ui/` |
| Integracion (flujo completo) | `{Page}.integration.spec.tsx` | Junto a la pagina en `ui/` |
| Logica pura | `{modulo}.spec.ts` | Junto al archivo en `lib/`, `model/`, etc. |

Los tests se co-localizan con el archivo que testean. El idioma de las descripciones es **espanol**.

## Nomenclatura de tests

Todos los nombres de test siguen el patron **"Si [condicion], debe [resultado esperado]"**:

```typescript
// ✅ Correcto
test('Si no hay datos, debe mostrar el empty state', ...)
test('Si el borrador tiene campos vacios, debe NO enviar la peticion', ...)
test('Si llega evento SignalR ComercioRadicado, debe navegar a /registro-compra/{id}', ...)

// ❌ Incorrecto
test('muestra empty state cuando no hay datos', ...)
test('renderiza la tabla correctamente', ...)
```

La estructura es:
- **Si** — precondicion o accion del usuario
- **debe** — comportamiento esperado observable

## Estructura obligatoria de un test

Patron **AAA** (Arrange / Act / Assert) con comentarios:

```typescript
import { expect, test } from 'vitest';

test('Si no hay datos, debe mostrar el empty state', async () => {
  // Arrange
  // ... setup: mocks, datos, render

  // Act
  // ... accion del usuario o llamada

  // Assert
  expect(resultado).toBe(esperado);
});
```

### Reglas de estilo

- **`const`** siempre, nunca `var`
- **`await`** en toda interaccion de `userEvent` (click, type, etc.)
- Importar `{ expect, test, describe }` de `vitest`, no usar globals
- Agrupar con `describe` solo si hay >3 tests para el mismo archivo

## Criterio para crear un test

Antes de crear un test, validar que cumple al menos uno:

1. **Respaldado por regla de negocio (R##)** del documento de definicion de alcance
2. **Valida contrato con endpoint** documentado en `docs/endpoints-oxp-*.md`
3. **Tiene logica que puede fallar silenciosamente** (division por cero, bitwise flags, conversiones de tipo)
4. **Cubre flujo de integracion** (UI → Store → Validacion → Payload → Backend)

NO crear tests para:
- Infraestructura pura sin logica de negocio (http-client, query-client)
- Funciones triviales de 1-3 lineas sin branching
- Store sync redundante con tests de integracion que ya cubren la cadena completa
- Warnings soft que no bloquean submit

## Tipos de test

### 1. Unitario — funciones puras

Sin providers ni render. Para `lib/`, adapters, mappers con logica de transformacion.

```typescript
import { expect, test } from 'vitest';
import { agregadoComercioToComercio } from './adapters';

test('Si concepto tiene cantidad=0, debe calcular valorUnitario sin division por cero', () => {
  const result = agregadoComercioToComercio(aggConCantidadCero);
  expect(result!.conceptos[0].valorUnitario).toBe(100000);
});
```

### 2. Componente — renderizado contra modelo de dominio

Verificar que los campos del endpoint se muestran correctamente:

```typescript
test('Si se renderiza con datos de comercio, debe mostrar el medio de pago seleccionado', async () => {
  renderWithProviders(<FormularioComercio data={COMERCIO_MOCK} onVerSugerida={noop} />);
  const medioPagoField = await screen.findByTestId('combobox-medio-pago');
  expect(medioPagoField).toHaveTextContent('Crédito');
});
```

### 3. Integracion — flujo completo UI → Backend

El tipo mas valioso. Renderiza la pagina completa, mockea APIs con MSW, interactua con el UI, y verifica el payload enviado via `requestLog`.

```typescript
test('Si el borrador tiene todos los campos completos y el usuario click Enviar, debe enviar POST /CompletarBorrador con el payload segun docs', async () => {
  // Arrange
  setupHandlers(BORRADOR_COMPLETO);
  renderPage();
  const user = userEvent.setup();

  // Act
  const botonEnviar = await screen.findByTestId('enviar-confirmacion-button');
  await user.click(botonEnviar);

  // Assert — verificar payload contra docs/endpoints-oxp-comercio.md
  await waitFor(() => {
    const post = requestLog.find(r => r.method === 'POST' && r.url.includes('/CompletarBorrador'));
    expect(post).toBeDefined();
    const body = post!.body as Record<string, unknown>;
    expect(body.informacionTercero).toEqual(expect.objectContaining({ nombre: 'Amazon.com' }));
  });
});
```

## MSW — Mocking de APIs

### Reglas

1. **Siempre** mockear endpoints con `server.use()` **antes** de `renderWithProviders()`
2. Usar wildcard prefix: `*/api/...` para no depender de base URL
3. Mockear **todos** los endpoints que el componente llama al montar (queries iniciales)
4. Usar `requestLog` de `@/shared/lib/testing/msw-server` para verificar peticiones enviadas
5. Los datos mock deben reflejar la estructura documentada en `docs/endpoints-oxp-*.md`

### Verificar payload enviado

```typescript
await waitFor(() => {
  const post = requestLog.find(r => r.method === 'POST' && r.url.includes('/mi-endpoint'));
  expect(post).toBeDefined();
  const body = post!.body as Record<string, unknown>;
  expect(body.campo).toBe('valor');
});
```

El `waitFor` es necesario porque las mutations son async — el POST no se envia inmediatamente despues del click.

## Mocking de SignalR

Para paginas que escuchan eventos SignalR (ej: registro-ocr), mockear `useOnNotificacion`:

```typescript
const notificacionCallbacks = new Map<string, (datos: unknown) => void>();

vi.mock('@/shared/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/api')>();
  return {
    ...actual,
    useOnNotificacion: ({ tipo, onMessage, enabled }) => {
      if (enabled !== false) notificacionCallbacks.set(tipo, onMessage);
    },
    useSignalR: () => ({ connection: { on: () => {}, off: () => {} }, isConnected: true }),
  };
});

// En el test: simular evento
notificacionCallbacks.get('ComercioRadicado')!({ id: 'abc-123' });
```

Este mock se pone **en el archivo de test**, no en vitest.setup.ts ni test-utils.tsx, porque solo aplica a paginas que usan SignalR.

## renderWithProviders — paginas con rutas

Para paginas que usan `useParams`, pasar `path` y `route`:

```typescript
renderWithProviders(<MiPage />, {
  path: 'registro-compra/:id',
  route: `/registro-compra/${OXP_ID}`,
});
```

El MemoryRouter tiene un catch-all (`data-testid="navigated-away"`) para absorber navegaciones post-accion sin errores 404.

## Seleccion de elementos

Orden de prioridad:

1. `getByRole` / `findByRole` — boton, combobox, textbox
2. `getByLabelText` / `findByLabelText` — inputs con label
3. `getByText` / `findByText` — texto visible
4. `getByTestId` / `findByTestId` — ultimo recurso (MUI DataGrid, botones sin texto accesible)

### findBy vs getBy

| Query | Cuando usar |
|-------|------------|
| `findBy*` | Elementos que aparecen despues de un fetch (retorna Promise) |
| `getBy*` | Elementos presentes inmediatamente en el DOM |

### findBy como wait point

Cuando necesitas esperar que un componente cargue antes de interactuar, usa `findBy*` **sin** envolver en `expect`:

```typescript
// ✅ Correcto — wait point para sincronizar con render async
await screen.findByText('AMZN*1X2Y3Z SEATTLE');
const porAsignar = screen.getAllByText('Por asignar');
await user.click(porAsignar[0]);

// ❌ Incorrecto — expect redundante en un wait point
expect(await screen.findByText('AMZN*1X2Y3Z SEATTLE')).toBeInTheDocument();
```

Solo usar `expect(await screen.findBy*).toBeInTheDocument()` cuando es el **assert final** del test (ej: verificar empty state, verificar navegacion).

## Que NO hacer

| Anti-patron | Correccion |
|-------------|-----------|
| `expect()` dentro del bloque `// Act` | Act solo tiene acciones (click, type, invocar callback). Mover expect al bloque `// Assert` |
| `expect(await findBy*)` como wait point | Usar `await findBy*` sin expect |
| `expect(el).toBeTruthy()` despues de `findBy*` | Quitar — si `findBy*` resuelve, el elemento existe |
| `var` para declarar variables | Usar `const` |
| `user.click(el)` sin `await` | Siempre `await user.click(el)` |
| Tests de infraestructura (http-client, query-client) | Solo testear logica de negocio |
| Tests de store sync redundantes con integracion | El integration test ya cubre UI→Store→Payload |
| Mockear SignalR en vitest.setup.ts | Mockear en el archivo de test que lo necesita |

## Ejecucion

```bash
bun vitest run                             # Todos los tests
bun vitest run path/to/file.spec.ts        # Un archivo especifico
bun vitest run --reporter=verbose          # Output detallado con warnings
```

## Checklist antes de dar por terminado un test

- [ ] Nombre sigue patron "Si X, debe Y"
- [ ] Patron AAA con comentarios
- [ ] `const` en todas las variables
- [ ] `await` en toda interaccion `userEvent`
- [ ] MSW handlers para todos los endpoints que el componente llama al montar
- [ ] Datos mock basados en `docs/endpoints-oxp-*.md`
- [ ] Assertions sobre comportamiento visible, no implementacion interna
- [ ] `findBy*` sin `expect` cuando es wait point, con `expect` solo en assert final
- [ ] El test pasa con `bun vitest run path/to/file.spec.ts`
- [ ] El test esta respaldado por regla de negocio, endpoint, o logica con riesgo de fallo
