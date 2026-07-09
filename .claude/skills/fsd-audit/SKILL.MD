---
name: fsd-audit
description: Audita el codebase contra las reglas de Feature-Sliced Design y buenas practicas React
---

# Auditoria FSD

Ejecuta una auditoria completa del codebase verificando todas las reglas de Feature-Sliced Design y buenas practicas React. Presenta los resultados como tabla resumen.

## Pasos de la auditoria

### 1. Componentes por archivo

Ejecutar el script de validacion:

```bash
bash scripts/check-single-component.sh
```

Reportar archivos que excedan el maximo de 4 componentes por archivo.

### 2. Dependencias entre capas

Verificar que los imports respetan la direccion FSD:

```
app -> pages -> widgets -> features -> entities -> shared
```

Buscar violaciones:
- `shared/` importando de cualquier otra capa
- `entities/` importando de `features/`, `widgets/`, `pages/` o `app/`
- `features/` importando de `widgets/`, `pages/` o `app/`
- `widgets/` importando de `pages/` o `app/`

```bash
# Buscar imports ilegales en cada capa
grep -r "from '@/features\|from '@/widgets\|from '@/pages\|from '@/app" src/shared/ --include="*.ts" --include="*.tsx" -l
grep -r "from '@/features\|from '@/widgets\|from '@/pages\|from '@/app" src/entities/ --include="*.ts" --include="*.tsx" -l
grep -r "from '@/widgets\|from '@/pages\|from '@/app" src/features/ --include="*.ts" --include="*.tsx" -l
grep -r "from '@/pages\|from '@/app" src/widgets/ --include="*.ts" --include="*.tsx" -l
```

### 3. Cross-slice imports (mismo layer)

Slices del mismo layer NUNCA se importan entre si:

```bash
# Features importando otros features
grep -rn "from '@/features/" src/features/ --include="*.ts" --include="*.tsx" | grep -v "index.ts"
# Filtrar: solo son violaciones si el import es a un slice DIFERENTE al que contiene el archivo

# Widgets importando otros widgets
grep -rn "from '@/widgets/" src/widgets/ --include="*.ts" --include="*.tsx" | grep -v "index.ts"

# Entities importando otras entities
grep -rn "from '@/entities/" src/entities/ --include="*.ts" --include="*.tsx" | grep -v "index.ts"
```

Para cada resultado, verificar que el archivo NO pertenece al mismo slice que importa (rutas relativas dentro del mismo slice son validas).

### 4. Logica de negocio en shared/

Revisar cada archivo en `src/shared/ui/`, `src/shared/model/`, `src/shared/lib/`:
- Contiene vocabulario de dominio? (obligacion, borrador, anticipo, extracto, concepto, etc.)
- Tiene logica de negocio? (validaciones de dominio, calculos fiscales, workflows)
- Si es generico y reutilizable sin contexto de dominio -> OK en shared

### 5. Hooks en ubicacion incorrecta

Buscar hooks (`useX`) que esten en `lib/` o `ui/` en vez de `hooks/`:

```bash
# Hooks en lib/
find src -path "*/lib/use*.ts" -o -path "*/lib/use*.tsx" | head -20

# Hooks en ui/
find src -path "*/ui/use*.ts" -o -path "*/ui/use*.tsx" | head -20
```

Cualquier resultado es una violacion. Los hooks deben estar en `hooks/`.

### 6. Componentes gordos (fat components)

Para cada `.tsx` en `ui/` de pages, widgets, features:
- Contar `useState`, `useEffect`, `useMutation`, `useQuery`
- Un componente es "gordo" si tiene: >2 useState + cualquier useEffect/useMutation/useQuery con logica de negocio
- Estado visual trivial (toggle de menu, hover) NO cuenta

```bash
# Encontrar componentes con muchos hooks
for f in $(find src/pages src/widgets src/features -path "*/ui/*.tsx"); do
  count=$(grep -c "useState\|useEffect\|useMutation\|useQuery\|useCallback\|useMemo" "$f" 2>/dev/null || echo 0)
  if [ "$count" -gt 4 ]; then
    echo "  $f ($count hooks)"
  fi
done
```

Para cada componente gordo, leer el archivo y determinar que logica debe extraerse a `hooks/`.

### 7. Public API (index.ts)

Verificar que cada slice tiene su `index.ts`:

```bash
# Slices sin index.ts
for dir in src/pages/*/  src/widgets/*/ src/features/*/ src/entities/*/; do
  if [ ! -f "${dir}index.ts" ]; then
    echo "  Falta index.ts: $dir"
  fi
done
```

### 8. Hooks con responsabilidad única (SOLID — S)

```bash
# Hooks grandes (>300 líneas)
for f in $(find src -name "use*.ts" -o -name "use*.tsx"); do
  lines=$(wc -l < "$f")
  if [ "$lines" -gt 300 ]; then
    echo "  $f ($lines líneas)"
  fi
done
```

Para cada hook grande, leer y verificar si maneja múltiples responsabilidades independientes (ej: guardado + descarte + navegación). Si sí → recomendar dividir.

### 9. useEffect para estado derivado (anti-patrón React)

```bash
# useEffect que contiene setState dentro
grep -rn "useEffect.*=>" src/ --include="*.ts" --include="*.tsx" -l | while read f; do
  # Buscar pattern: useEffect que llama a un setter de useState
  matches=$(grep -cP "useEffect\(\(\) => \{[\s\S]*?set[A-Z]" "$f" 2>/dev/null || echo 0)
  if [ "$matches" -gt 0 ]; then
    echo "  $f ($matches useEffect con setState)"
  fi
done
```

Para cada resultado, leer el archivo y determinar si el `useEffect` es un side-effect real (WebSocket, DOM API, timer) o si está sincronizando estado derivado (debe ser un cálculo inline).

## Formato del reporte

Presentar los resultados en este formato:

```
## Auditoria FSD - Resultados

### Resumen

| Regla                          | Estado | Violaciones |
|--------------------------------|--------|-------------|
| Componentes por archivo (max 4)| PASS/FAIL | N archivos |
| Dependencias entre capas       | PASS/FAIL | N archivos |
| Cross-slice imports            | PASS/FAIL | N archivos |
| Logica de negocio en shared/   | PASS/FAIL | N archivos |
| Hooks en ubicacion correcta    | PASS/FAIL | N archivos |
| Componentes delgados           | PASS/FAIL | N componentes gordos |
| Public API (index.ts)          | PASS/FAIL | N slices sin index |
| Hooks con responsabilidad única | PASS/FAIL | N hooks >300 líneas |
| useEffect para estado derivado  | PASS/WARN | N archivos |

### Detalle de violaciones

(Para cada regla que falle, listar los archivos afectados con ruta completa y descripcion de la violacion)
```
