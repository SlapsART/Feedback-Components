# iniciar-proyecto

Configura y valida el entorno completo del proyecto.
Llamado automáticamente por el orquestador al detectar que el proyecto no está configurado.

Principio: **resolver todo de forma autónoma**. Solo interrumpir al diseñador cuando
se necesita algo que únicamente él puede proveer (un archivo físico, una URL, una decisión).
Nunca pedir que contacte a terceros.

---

## Bloque 1 — Node.js y Bun

Detectar qué está instalado:

```bash
node --version 2>/dev/null && echo "node:ok" || echo "node:FALTA"
bun  --version 2>/dev/null && echo "bun:ok"  || echo "bun:FALTA"
```

**Todo lo que falta se instala automáticamente. No avisar al diseñador.**

Los comandos de instalación son exactamente los de la documentación oficial de cada herramienta.
La única diferencia: se descarga a un archivo temporal antes de ejecutar
en lugar de pipe directo, para no correr código sin verificar que la descarga llegó completa.

---

### Si Node.js no está instalado

Método oficial: **nvm** — documentación en https://github.com/nvm-sh/nvm

```bash
NVM_VERSION="v0.39.7"
NVM_TMP="/tmp/nvm_install_$$.sh"

# Descargar el instalador oficial de nvm
curl --proto '=https' --tlsv1.2 -fsSL \
  "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" \
  -o "$NVM_TMP"

# Verificar que la descarga llegó completa antes de ejecutar
[ -s "$NVM_TMP" ] || { echo "node:FALLO_DESCARGA"; rm -f "$NVM_TMP"; exit 1; }

# Ejecutar y limpiar
bash "$NVM_TMP"
rm -f "$NVM_TMP"

# Cargar nvm en la sesión actual (sin reiniciar terminal)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instalar Node.js LTS
nvm install --lts
nvm use --lts
node --version
```

---

### Si Bun no está instalado

Método oficial: script de instalación de **bun.sh** — documentación en https://bun.sh/docs/installation

```bash
BUN_TMP="/tmp/bun_install_$$.sh"

# Descargar el instalador oficial de Bun
curl --proto '=https' --tlsv1.2 -fsSL "https://bun.sh/install" -o "$BUN_TMP"

# Verificar que la descarga llegó completa antes de ejecutar
[ -s "$BUN_TMP" ] || { echo "bun:FALLO_DESCARGA"; rm -f "$BUN_TMP"; exit 1; }

# Ejecutar y limpiar
bash "$BUN_TMP"
rm -f "$BUN_TMP"

# Cargar Bun en la sesión actual (sin reiniciar terminal)
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
bun --version
```

---

### Hacer el PATH persistente en el perfil del shell

```bash
SHELL_PROFILE=""
[ -f "$HOME/.zshrc" ]        && SHELL_PROFILE="$HOME/.zshrc"
[ -f "$HOME/.bashrc" ]       && [ -z "$SHELL_PROFILE" ] && SHELL_PROFILE="$HOME/.bashrc"
[ -f "$HOME/.bash_profile" ] && [ -z "$SHELL_PROFILE" ] && SHELL_PROFILE="$HOME/.bash_profile"

if [ -n "$SHELL_PROFILE" ]; then
  grep -q "NVM_DIR" "$SHELL_PROFILE" || cat >> "$SHELL_PROFILE" << 'PROFILE'

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
PROFILE

  grep -q "BUN_INSTALL" "$SHELL_PROFILE" || cat >> "$SHELL_PROFILE" << 'PROFILE'

# Bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
PROFILE
fi
```

---

### Verificación final

```bash
node --version 2>/dev/null && echo "node:ok" || echo "node:FALLO"
bun  --version 2>/dev/null && echo "bun:ok"  || echo "bun:FALLO"
```

Si alguno dice `FALLO`: capturar el error exacto y reportarle al diseñador
qué impide la instalación con el diagnóstico concreto.

---

## Bloque 2 — Dependencias del proyecto

```bash
[ -d "node_modules" ] && echo "ok" || echo "FALTA"
```

Si falta `node_modules`: instalar automáticamente sin avisar.
```bash
bun install 2>&1
```
Si `bun install` falla: intentar `npm install 2>&1`.
Si ambos fallan: revisar `package.json` para detectar la causa antes de escalar.

---

## Bloque 3 — Stack del proyecto

```bash
node -e "
const pkg = require('./package.json');
const all = { ...pkg.dependencies, ...pkg.devDependencies };
const required = {
  'react':               { pkg: 'react',               min: 19 },
  'typescript':          { pkg: 'typescript',           min: 5  },
  '@mui/material':       { pkg: '@mui/material',        min: 7  },
  '@mui/x-data-grid':    { pkg: '@mui/x-data-grid',     min: 7  },
  '@emotion/react':      { pkg: '@emotion/react',       min: 11 },
  '@emotion/styled':     { pkg: '@emotion/styled',      min: 11 },
  '@tabler/icons-react': { pkg: '@tabler/icons-react',  min: 0  },
};
let missing = [];
for (const [label, { pkg }] of Object.entries(required)) {
  if (!all[pkg]) missing.push(pkg);
}
console.log(missing.length ? 'MISSING:' + missing.join(',') : 'ok');
" 2>/dev/null
```

Si hay paquetes faltantes: instalarlos automáticamente sin avisar al diseñador.
```bash
bun add {lista de paquetes faltantes}
```
Verificar con `bun run build 2>&1 | head -5` que no haya errores de módulos faltantes.

---

## Bloque 4 — Carpeta /theme

### 4a. Localizar

```bash
find . -type d -name "theme" \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" 2>/dev/null
```

**Si no se encuentra:** el diseñador tiene que proveerla — es el único paso que genuinamente
requiere su intervención. Pedírsela sin tecnicismos:

```
Necesito la carpeta de estilos del proyecto (se llama "theme").
¿Puedes copiarla en la carpeta principal del proyecto y decirme cuando esté lista?
```

Esperar confirmación, luego continuar automáticamente.

### 4b. Verificar archivos esperados

```bash
THEME_ROOT="{ruta encontrada}"
for f in \
  "$THEME_ROOT/base/baseTheme.ts" \
  "$THEME_ROOT/cosmos/cosmosDarkTheme.ts" \
  "$THEME_ROOT/cosmos/cosmosLightTheme.ts" \
  "$THEME_ROOT/cosmosTheme.ts" \
  "$THEME_ROOT/mui-theme-augmentation.ts" \
  "$THEME_ROOT/ThemeCOSMOS.json"; do
  [ -f "$f" ] || echo "FALTA: $f"
done
```

Archivos faltantes → advertencia interna. No bloquear ni avisar al diseñador.

### 4c. Validar ThemeCOSMOS.json

```bash
node -e "
  try {
    JSON.parse(require('fs').readFileSync('{THEME_ROOT}/ThemeCOSMOS.json', 'utf8'));
    console.log('ok');
  } catch(e) { console.log('INVALIDO:' + e.message); }
" 2>/dev/null
```

Si es inválido: pedírselo al diseñador en términos simples:
```
El archivo de tokens de diseño tiene un error de formato.
¿Puedes exportarlo de nuevo desde Figma y reemplazar el archivo?
(En Figma: menú de plugins → exportar tokens de diseño)
```

### 4d. Mover /theme si está fuera de src/

La ubicación correcta es `src/app/styles/theme/`.

```bash
echo "{ruta encontrada}" | grep -q "^./src/" && echo "ok" || echo "MOVER"
```

Si hay que mover: detectar todos los imports antes de mover.
```bash
grep -rn "from '.*theme\|from \".*theme\|require('.*theme" \
  src/ --include="*.ts" --include="*.tsx" 2>/dev/null
```

Mover:
```bash
mkdir -p src/app/styles
mv {ruta encontrada} src/app/styles/theme
```

Actualizar cada import encontrado con `str_replace`. Verificar:
```bash
bun run build 2>&1 | grep -i "cannot find module.*theme" || echo "imports:ok"
```

Si quedan imports rotos: corregirlos antes de continuar.

### 4e. Detectar ThemeProvider

Buscar en orden de prioridad:
```bash
for f in src/app/layout.tsx src/app/providers.tsx src/main.tsx src/index.tsx src/App.tsx; do
  [ -f "$f" ] && grep -q "ThemeProvider" "$f" && echo "found:$f" && break
done
```

Si hay múltiples resultados: leer cada uno para determinar el punto de entrada real
(buscar el que tenga `ReactDOM.render` o `createRoot` cerca, o el layout raíz de Next.js).

Si el archivo correcto no importa `cosmosTheme`: agregar el import automáticamente.
Si no hay `ThemeProvider` en ningún archivo: no bloquear, registrar como advertencia interna.

### 4f. mui-theme-augmentation en tsconfig

```bash
grep -q "mui-theme-augmentation" tsconfig.json 2>/dev/null || echo "AGREGAR"
```

Si falta: agregar la entrada al array `include` de `tsconfig.json` sin eliminar las existentes.

### 4g. ThemeCOSMOS.json referenciado

```bash
grep -r "ThemeCOSMOS" src/app/styles/theme/ --include="*.ts" 2>/dev/null || echo "NO_REF"
```

Si no está referenciado: advertencia interna. No bloquear.

---

## Bloque 5 — Archivos de definición

### figma-to-code-workflow.md
```bash
[ -f "definitions/figma-to-code-workflow.md" ] || {
  mkdir -p definitions
  cat > definitions/figma-to-code-workflow.md << 'WORKFLOW'
# Figma to Code — Workflow

## Convenciones del proyecto

- Stack: React 19 + TypeScript 5.9 + MUI 7 + Tabler Icons
- Arquitectura: Feature-Sliced Design
- Theme: src/app/styles/theme/cosmosTheme.ts
- Tokens de diseño: src/app/styles/theme/ThemeCOSMOS.json

---

## Lecciones Aprendidas

| Fecha | Lección | Contexto |
|-------|---------|----------|
WORKFLOW
}
```

**Solo crear si no existe.** Si ya existe: no tocarlo.

### component-registry.json
```bash
[ -f "definitions/component-registry.json" ] || {
  mkdir -p definitions
  cat > definitions/component-registry.json << 'REGISTRY'
{
  "_meta": { "version": 1, "updatedAt": "", "totalComponents": 0, "totalPatterns": 0 },
  "components": {},
  "patterns": {}
}
REGISTRY
}
```

---

## Bloque 6 — Guardar configuración

Crear o sobreescribir `definitions/.project-config.json`:

```json
{
  "configuredAt": "{ISO_TIMESTAMP}",
  "stack": {
    "react": "{versión}",
    "typescript": "{versión}",
    "mui": "{versión}",
    "tabler": "{versión}"
  },
  "theme": {
    "root": "src/app/styles/theme",
    "entry": "src/app/styles/theme/cosmosTheme.ts",
    "augmentation": "src/app/styles/theme/mui-theme-augmentation.ts",
    "tokens": "src/app/styles/theme/ThemeCOSMOS.json",
    "files": {
      "baseTheme": "src/app/styles/theme/base/baseTheme.ts",
      "lightTheme": "src/app/styles/theme/cosmos/cosmosLightTheme.ts",
      "darkTheme": "src/app/styles/theme/cosmos/cosmosDarkTheme.ts"
    }
  },
  "devServer": "http://localhost:3001",
  "devRoutes": {},
  "definitions": {
    "workflow": "definitions/figma-to-code-workflow.md",
    "registry": "definitions/component-registry.json",
    "figmaPages": "definitions/figma-pages/",
    "figmaCache": "definitions/.figma-cache/"
  }
}
```

---

## Bloque 7 — Resultado

**Si todo pasó sin intervención del diseñador:** no mostrar nada.
El orquestador continuará al siguiente estado silenciosamente.

**Si hubo advertencias internas:** guardarlas en el config, no molestar al diseñador.

**Si hay algo que requirió intervención del diseñador y ya fue resuelto:**
continuar directamente al siguiente bloque sin resumen ni confirmación.

El orquestador solo necesita saber si la configuración terminó con éxito (`config:ok`)
o si hay un bloqueo real que requiere acción del diseñador.
