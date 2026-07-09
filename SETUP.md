# Skills de Figma-to-Code — Guía de inicio

## Instalación

1. Copia la carpeta `.claude/` en la raíz de tu proyecto
2. Copia `definitions/component-registry.json` en tu carpeta `definitions/`
3. Asegúrate de que la carpeta `/theme` esté en el proyecto (ver más abajo)

---

## Flujo completo

### 1. Configurar el proyecto (una sola vez)
```
/iniciar-proyecto
```
Valida el stack, detecta y mueve la carpeta `/theme` al lugar correcto, y crea los archivos que necesitan los demás comandos. Si algo falta, te dice exactamente qué resolver.

### 2. Extraer los diseños de Figma
```
/figma-extract {TOKEN_DE_FIGMA} {URL_DEL_ARCHIVO_FIGMA}
```
Genera los archivos de referencia a partir del archivo de Figma.

### 3. Implementar una página
```
/loop-implementar definitions/figma-pages/{nombre-de-la-pagina}.md
```
Implementa, revisa, corrige y repite hasta que todo esté al 100% igual al Figma.

---

## Comandos disponibles

| Comando | Para qué sirve |
|---------|---------------|
| `/iniciar-proyecto` | Configura el entorno completo. Corre primero, una sola vez. |
| `/figma-extract` | Conecta con Figma y genera los archivos de referencia. |
| `/loop-implementar` | Implementa una página completa hasta 100% de fidelidad. |
| `/implementar-diseño` | Implementa componentes específicos (usado por el loop). |
| `/revisar-implementacion` | Revisa la fidelidad visual de lo implementado. |
| `/component-registry` | Gestiona la memoria de componentes reutilizables. |
| `/documentar-aprendizajes` | Guarda las lecciones de la sesión. |

---

## La carpeta /theme

Esta carpeta contiene toda la personalización visual del proyecto (colores, tipografía, componentes).
`/iniciar-proyecto` la detecta automáticamente y, si está en la raíz, la mueve a `src/app/styles/theme/` para mantener una estructura escalable.

Estructura esperada dentro de `/theme`:
```
theme/
  base/
    baseTheme.ts          ← configuración global compartida
  cosmos/
    cosmosDarkTheme.ts    ← tema oscuro
    cosmosLightTheme.ts   ← tema claro
  cosmosTheme.ts          ← punto de entrada que compone todo
  mui-theme-augmentation.ts ← extiende los tipos de MUI para TypeScript
  ThemeCOSMOS.json        ← tokens de diseño exportados desde Figma
```

---

## Componentes globales

Si un componente se usa en más de una pantalla, díselo al agente:
```
Este componente es global, no lo implementes de nuevo en otras pantallas
```

O usa el comando directamente:
```
/component-registry --global src/shared/ui/MiComponente.tsx
```

El agente también detecta automáticamente cuando un patrón se repite en 2 o más pantallas
y te pregunta si quieres marcarlo como global.

---

## Archivos generados automáticamente

| Archivo | Propósito |
|---------|-----------|
| `definitions/.project-config.json` | Configuración detectada del proyecto |
| `definitions/.loop-state.json` | Estado del loop actual |
| `definitions/figma-pages/_index.json` | Índice de páginas y nodos de Figma |
| `definitions/.figma-cache/` | Caché de llamadas a la API de Figma |
| `definitions/component-registry.json` | Memoria de componentes reutilizables |
| `definitions/figma-to-code-workflow.md` | Lecciones aprendidas del proyecto |
