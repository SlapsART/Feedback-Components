import './mui-theme-augmentation';
import { createTheme } from '@mui/material/styles';

/**
 * TEMA COSMOS - MATERIAL-UI
 *
 * Tema basado en el sistema de diseño Cosmos con tokens definidos en cosmos.tokens.json
 * Mantiene todas las configuraciones del tema original pero con la identidad visual de Cosmos
 *
 * Características:
 * - Colores principales violeta/morado de la marca Cosmos (#5323de)
 * - Fuente IBM Plex Sans según especificación Cosmos
 * - Configuraciones size="small" por defecto según guidelines
 * - Componentes personalizados con colores y estilos Cosmos
 */
export const cosmosTheme = createTheme({
  // ============================================================================
  // PALETA DE COLORES COSMOS
  // ============================================================================
  palette: {
    mode: 'light',

    // COLORES PRIMARIOS - Violeta/Morado Cosmos
    primary: {
      50: '#f3f3ff',        // Tono más claro para fondos
      100: '#f3f3ff',       // Para estados hover sutiles (repetido según tokens)
      200: '#d6d5ff',       // Tono claro
      300: '#b9b3ff',       // Tono medio-claro
      400: '#9588fd',       // Tono medio (light)
      500: '#5323de',       // Color principal COSMOS
      600: '#7358fa',       // Tono medio-oscuro (hover)
      700: '#6135f2',       // Tono oscuro
      800: '#451dba',       // Tono muy oscuro
      900: '#3a1a98',       // Tono más oscuro (dark)
      main: '#5323de',      // Color principal de Cosmos
      light: '#9588fd',     // Variante clara
      dark: '#3a1a98',      // Variante oscura
      contrastText: '#ffffff', // Texto blanco sobre primario
    },

    // COLORES SECUNDARIOS - Cyan Cosmos
    secondary: {
      50: '#e0f7fa',        // Para fondos sutiles
      100: '#b3ebf2',       // Estados hover claros
      200: '#80deea',       // Tono claro
      300: '#4dd0e1',       // Tono medio-claro
      400: '#26c6da',       // Tono medio (light)
      500: '#00bcd4',       // Color secundario principal
      600: '#00b6cf',       // Tono medio-oscuro
      700: '#00adc9',       // Tono oscuro
      800: '#00a5c3',       // Tono muy oscuro
      900: '#0097b9',       // Tono más oscuro (dark)
      main: '#00bcd4',      // Color secundario Cosmos
      light: '#26c6da',     // Variante clara
      dark: '#0097b9',      // Variante oscura
      contrastText: '#ffffff',
    },

    // COLORES SEMÁNTICOS - Definidos según tokens Cosmos
    error: {
      50: '#f9e8e8',        // Fondo para alertas de error
      100: '#f1c7c7',       // Estados hover de error
      200: '#e8a1a1',       // Error claro
      300: '#df7b7b',       // Error medio-claro
      400: '#d85f5f',       // Error medio (light)
      500: '#d14343',       // Error principal
      600: '#cc3d3d',       // Error medio-oscuro
      700: '#c63434',       // Error oscuro
      800: '#c02c2c',       // Error muy oscuro
      900: '#b51e1e',       // Error más oscuro (dark)
      main: '#d14343',
      light: '#d85f5f',
      dark: '#b51e1e',
      contrastText: '#ffffff',
    },
    warning: {
      50: '#fff0e0',        // Fondo para alertas de advertencia
      100: '#fedab3',       // Estados hover de advertencia
      200: '#fdc280',       // Advertencia claro
      300: '#fcaa4d',       // Advertencia medio-claro
      400: '#fc9726',       // Advertencia medio (light)
      500: '#fb8500',       // Advertencia principal
      600: '#fa7d00',       // Advertencia medio-oscuro
      700: '#fa7200',       // Advertencia oscuro
      800: '#f96800',       // Advertencia muy oscuro
      900: '#f85500',       // Advertencia más oscuro (dark)
      main: '#fb8500',
      light: '#fc9726',
      dark: '#f85500',
      contrastText: '#ffffff',
    },
    info: {
      50: '#e6f3f8',        // Fondo para alertas informativas
      100: '#c0e2ee',       // Estados hover informativos
      200: '#96cfe2',       // Info claro
      300: '#6cbcd6',       // Info medio-claro
      400: '#4dadce',       // Info medio (light)
      500: '#2d9fc5',       // Info principal
      600: '#2897bf',       // Info medio-oscuro
      700: '#228db8',       // Info oscuro
      800: '#1c83b0',       // Info muy oscuro
      900: '#1172a3',       // Info más oscuro (dark)
      main: '#2d9fc5',
      light: '#4dadce',
      dark: '#1172a3',
      contrastText: '#ffffff',
    },
    success: {
      50: '#f2f9e7',        // Fondo para alertas de éxito
      100: '#ddefc4',       // Estados hover de éxito
      200: '#c7e49d',       // Éxito claro
      300: '#b1d975',       // Éxito medio-claro
      400: '#a0d158',       // Éxito medio (light)
      500: '#8fc93a',       // Éxito principal
      600: '#87c334',       // Éxito medio-oscuro
      700: '#7cbc2c',       // Éxito oscuro
      800: '#72b525',       // Éxito muy oscuro
      900: '#60a918',       // Éxito más oscuro (dark)
      main: '#8fc93a',
      light: '#a0d158',
      dark: '#60a918',
      contrastText: '#ffffff',
    },

    // COLORES GRISES - Paleta Cosmos
    grey: {
      50: '#fbfbfb',        // Gris más claro
      100: '#f5f5f6',       // Gris muy claro
      200: '#eaebec',       // Gris claro
      300: '#dcdee0',       // Gris medio-claro
      400: '#ced1d4',       // Gris medio
      500: '#c4c7ca',       // Gris principal
      600: '#b9bdc1',       // Gris medio-oscuro
      700: '#b2b7bb',       // Gris oscuro
      800: '#aaaeb3',       // Gris muy oscuro
      900: '#a2a6ab',       // Gris más oscuro
    },

    // COLORES DE FONDO Y SUPERFICIE - Cosmos
    background: {
      default: '#f5f5f5',   // Fondo general de la aplicación
      paper: '#ffffff',     // Fondo de cards, modals, etc.
    },

    // COLORES DE TEXTO - Cosmos
    text: {
      primary: '#101840',   // Texto principal (azul muy oscuro Cosmos)
      secondary: 'rgba(16, 24, 64, 0.6)', // Texto secundario (60% opacidad)
      disabled: 'rgba(16, 24, 64, 0.38)', // Texto deshabilitado (38% opacidad)
    },

    // DIVISORES Y ELEMENTOS DE ACCIÓN
    divider: 'rgba(0, 0, 0, 0.12)', // Líneas divisorias
    action: {
      active: 'rgba(16, 24, 64, 0.54)',     // Elementos activos
      hover: 'rgba(16, 24, 64, 0.04)',      // Estados hover (4% opacidad)
      selected: 'rgba(16, 24, 64, 0.08)',   // Elementos seleccionados (8% opacidad)
      disabled: 'rgba(16, 24, 64, 0.26)',   // Elementos deshabilitados
      disabledBackground: 'rgba(16, 24, 64, 0.12)', // Fondo deshabilitado
      focus: 'rgba(16, 24, 64, 0.12)',      // Estados de foco
    },
  },

  // ============================================================================
  // TIPOGRAFÍA COSMOS - IBM PLEX SANS
  // ============================================================================
  typography: {
    fontFamily: '"IBM Plex Sans", "Roboto", "Helvetica", "Arial", sans-serif', // IBM Plex Sans como fuente principal

    // JERARQUÍA DE TÍTULOS - Basada en tokens Cosmos
    h1: {
      fontSize: '2.5rem',      // 40px según Size.H1
      fontWeight: 400,         // Regular según Weight
      lineHeight: '3rem',      // 48px según LineHeight.H1
      letterSpacing: '-1.5px', // Según LetterSpacing.H1
    },
    h2: {
      fontSize: '2rem',        // 32px según Size.H2
      fontWeight: 400,         // Regular
      lineHeight: '2.5rem',    // 40px según LineHeight.H2
      letterSpacing: '-0.5px', // Según LetterSpacing.H2
    },
    h3: {
      fontSize: '1.75rem',     // 28px según Size.H3
      fontWeight: 400,         // Regular
      lineHeight: '2rem',      // 32px según LineHeight.H3
      letterSpacing: '0px',    // Según LetterSpacing.H3
    },
    h4: {
      fontSize: '1.375rem',    // 22px según Size.H4
      fontWeight: 400,         // Regular
      lineHeight: '1.5rem',    // 24px según LineHeight.H4
      letterSpacing: '0.25px', // Según LetterSpacing.H4
    },
    h5: {
      fontSize: '1.125rem',    // 18px según Size.H5
      fontWeight: 400,         // Regular
      lineHeight: '1.5rem',    // 24px según LineHeight.H5
      letterSpacing: '0px',    // Según LetterSpacing.H5
    },
    h6: {
      fontSize: '1rem',        // 16px según Size.H6
      fontWeight: 500,         // Medium
      lineHeight: '1rem',      // 16px según LineHeight.H6
      letterSpacing: '0.15px', // Según LetterSpacing.H6
    },

    // TEXTO DE CUERPO - Basado en tokens Cosmos
    body1: {
      fontSize: '0.875rem',    // 14px según Size.Body1
      fontWeight: 400,         // Regular
      lineHeight: '1rem',      // 16px según LineHeight.Body1
      letterSpacing: '0.15px', // Según LetterSpacing.Body1
    },
    body2: {
      fontSize: '0.8125rem',   // 13px según Size.Body2
      fontWeight: 400,         // Regular
      lineHeight: '1rem',      // 16px según LineHeight.Body2
      letterSpacing: '0.17px', // Según LetterSpacing.Body2
    },
    body3: {
      fontSize: '0.75rem',     // 12px
      fontWeight: 400,         // Regular
      lineHeight: '1rem',      // 16px
      letterSpacing: '0.17px', // Letter spacing
    },

    // ELEMENTOS ESPECIALES
    button: {
      fontSize: '0.8125rem',   // 13px según button.medium.size
      fontWeight: 500,         // Medium weight
      lineHeight: '1.25rem',   // 20px según button.medium.line-height
      textTransform: 'none' as const, // Sin transformación
    },
    caption: {
      fontSize: '0.6875rem',   // 11px según Size.Caption
      fontWeight: 400,         // Regular
      lineHeight: '0.875rem',  // 14px según LineHeight.Caption
      letterSpacing: '0.4px',  // Según LetterSpacing.Caption
    },
    overline: {
      fontSize: '0.6875rem',   // 11px según Size.Overline
      fontWeight: 400,
      lineHeight: '1.5rem',    // 24px según LineHeight.Overline
      letterSpacing: '1px',    // Según LetterSpacing.Overline
      textTransform: 'uppercase' as const,
    },
    subtitle1: {
      fontSize: '0.875rem',    // 14px según Size.Subtitle1
      fontWeight: 400,
      lineHeight: '1rem',      // 16px según LineHeight.Subtitle1
      letterSpacing: '0.15px', // Según LetterSpacing.Subtitle1
    },
    subtitle2: {
      fontSize: '0.8125rem',   // 13px según Size.Subtitle2
      fontWeight: 500,         // Medium
      lineHeight: '1rem',      // 16px según LineHeight.Subtitle2
      letterSpacing: '0.1px',  // Según LetterSpacing.Subtitle2
    },
  },

  // ============================================================================
  // ESPACIADO Y FORMAS - COSMOS
  // ============================================================================
  spacing: 8,                   // Unidad base de espaciado (8px)
  shape: {
    borderRadius: 4              // Radio de borde según border-radius.chip
  },

  // ============================================================================
  // PERSONALIZACIÓN DE COMPONENTES CON ESTILOS COSMOS
  // ============================================================================
  components: {
    // ============================================================================
    // CONFIGURACIÓN GLOBAL - SIZE="SMALL" POR DEFECTO
    // ============================================================================

    // BOTONES - Con padding según tokens Cosmos
    MuiButton: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          textTransform: 'none',
          borderRadius: 4, // borderRadius según tokens
          ...(ownerState.size === 'small' && {
            padding: '4px 10px', // vertical.small + horizontal.small según tokens
            fontSize: '0.75625rem', // 12.1px según button.small.size
            lineHeight: '1.125rem', // 18px según button.small.line-height
          }),
          ...(ownerState.size === 'medium' && {
            padding: '6px 16px', // vertical.medium + horizontal.medium según tokens
            fontSize: '0.8125rem', // 13px según button.medium.size
            lineHeight: '1.25rem', // 20px según button.medium.line-height
          }),
          ...(ownerState.size === 'large' && {
            padding: '8px 22px', // vertical.large + horizontal.large según tokens
            fontSize: '0.875rem', // 14px según button.large.size
            lineHeight: '1.375rem', // 22px según button.large.line-height
          }),
        }),
      },
    },

    // CAMPOS DE ENTRADA - CONFIGURACIÓN BASE
    // ----------------------------------------------------------------------------
    // Ajustes para los inputs base que afectan a todos los tipos de campos
    // ----------------------------------------------------------------------------
    MuiInputBase: {
      defaultProps: {
        margin: "none",                     // Sin margen por defecto
      },
      styleOverrides: {
        root: {
          // Ajuste de padding vertical para inputs outlined pequeños
          ".MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": {
            paddingBlock: 5.94,               // Padding vertical de 5.9px para tamaño small
          },
        },
      },
    },


    // ETIQUETAS DE CAMPOS (LABELS)
    // ----------------------------------------------------------------------------
    // Configuración de las etiquetas flotantes para los diferentes variantes:
    // - filled: inputs con fondo relleno
    // - standard: inputs con línea inferior
    // - outlined: inputs con borde completo
    // ----------------------------------------------------------------------------
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",                    // Margen denso por defecto
      },
      styleOverrides: {
        // Asterisco de campo requerido en color de error
        asterisk: ({ theme }: any) => ({
          color: theme.palette.error.main,
        }),

        // Etiqueta en estado de error usa color de texto secundario
        error: ({ theme }: any) => ({
          color: theme.palette.text.secondary
        }),

        // Configuración base del label
        root: {
          lineHeight: "1.1rem",              // Altura de línea ajustada
        },

        // VARIANTE FILLED - Posicionamiento de labels
        filled: {
          // Small: posición inicial del label
          "&.MuiInputLabel-filled.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)": {
            transform: "translate(12px, 15px) scale(1)",
          },
          // Medium: posición inicial del label
          "&.MuiInputLabel-filled.MuiInputLabel-sizeMedium:not(.MuiInputLabel-shrink)": {
            transform: "translate(12px, 19px) scale(1)",
          },
        },

        // VARIANTE STANDARD - Posicionamiento de labels
        standard: {
          // Small: posición inicial del label
          "&.MuiInputLabel-standard.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)": {
            transform: "translate(0, 14px) scale(1)",
          },
          // Medium: posición inicial del label
          "&.MuiInputLabel-standard.MuiInputLabel-sizeMedium:not(.MuiInputLabel-shrink)": {
            transform: "translate(0, 16px) scale(1)",
          },
        },

        // VARIANTE OUTLINED - Posicionamiento de labels
        outlined: {
          // Small: posición más compacta
          "&.MuiInputLabel-outlined.MuiInputLabel-sizeSmall": {
            transform: "translate(14px, 8px) scale(1)",
          },
          // Default: posición estándar y estado contraído
          "&.MuiInputLabel-outlined": {
            transform: "translate(14px, 14px) scale(1)",

            // Label contraído (cuando hay focus o contenido)
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -7px) scale(0.75)",
            },
          },
        },
      },
    },

    // CAMPOS DE TEXTO COMPLETOS
    // ----------------------------------------------------------------------------
    // Configuración específica para componentes TextField
    // ----------------------------------------------------------------------------
    MuiTextField: {
      defaultProps: {
        size: 'small'                        // Tamaño compacto por defecto
      },
      variants: [
        {
          // Variante standard sin margen: elimina padding del input
          props: { variant: "standard", margin: "none" },
          style: {
            ".MuiInputBase-input.MuiInputBase-inputSizeSmall": {
              padding: 0,                    // Sin padding para maximizar espacio
            },
          },
        },
      ],
    },

    // CONTROLES DE FORMULARIO
    MuiFormControl: {
      defaultProps: {
        size: 'small'
      },
    },
    MuiList: {
      defaultProps: { dense: true },
    },
    MuiTable: {
      defaultProps: { size: 'small' },
    },
    MuiIconButton: {
      defaultProps: { size: 'small' },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },

    // CHIPS COSMOS - Colores según tokens
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4, // border-radius.chip
          fontSize: '0.6875rem', // 11px según typography.chip.size
          lineHeight: '0.875rem', // 14px según typography.chip.line-height
        },
        filled: {
          '&.MuiChip-colorDefault': {
            backgroundColor: '#e4e5e7', // components.chip.default.main
            color: '#5a5e73', // components.chip.default.contrast
            '& .MuiChip-deleteIcon': {
              color: '#000000', // components.chip.defaultCloseFill
              '&:hover': {
                color: 'rgba(0, 0, 0, 0.88)',
              },
            },
            '&:hover': {
              backgroundColor: '#d1d3d7', // components.chip.default.dark
            },
            '&:focus': {
              backgroundColor: '#f2f2f3', // components.chip.default.light
            },
            '&:active': {
              backgroundColor: '#d1d3d7',
            },
          },
          '&.MuiChip-colorPrimary': {
            backgroundColor: '#c4e1f5', // components.chip.primary.main
            color: '#5a5e73', // components.chip.primary.contrast
            '&:hover': {
              backgroundColor: '#a2cdee', // components.chip.primary.dark
            },
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: '#c4f6fd', // components.chip.secondary.main
            color: '#5a5e73',
            '&:hover': {
              backgroundColor: '#a8f1fb', // components.chip.secondary.dark
            },
          },
          '&.MuiChip-colorError': {
            backgroundColor: '#fcd4d4', // components.chip.error.main
            color: '#5a5e73',
            '&:hover': {
              backgroundColor: '#fab9b9', // components.chip.error.dark
            },
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: '#fce4c0', // components.chip.warning.main
            color: '#5a5e73',
            '&:hover': {
              backgroundColor: '#fad19c', // components.chip.warning.dark
            },
          },
          '&.MuiChip-colorInfo': {
            backgroundColor: '#c0e8fc', // components.chip.info.main
            color: '#5a5e73',
            '&:hover': {
              backgroundColor: '#9cd8fa', // components.chip.info.dark
            },
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: '#ddf8c3', // components.chip.success.main
            color: '#5a5e73',
            '&:hover': {
              backgroundColor: '#c8f3a2', // components.chip.success.dark
            },
          },
        },
        outlined: {
          '&.MuiChip-outlinedDefault': {
            border: '1px solid #ced1d4', // components.chip.defaultEnabledBorder
            backgroundColor: 'transparent',
            color: '#5a5e73',
          },
          '&.MuiChip-outlinedPrimary': {
            border: '1px solid #5323de', // primary main
            backgroundColor: 'transparent',
            color: '#5323de',
          },
          '&.MuiChip-outlinedSecondary': {
            border: '1px solid #00bcd4',
            backgroundColor: 'transparent',
            color: '#00bcd4',
          },
          '&.MuiChip-outlinedSuccess': {
            border: '1px solid #8fc93a',
            backgroundColor: 'transparent',
            color: '#8fc93a',
          },
          '&.MuiChip-outlinedError': {
            border: '1px solid #d14343',
            backgroundColor: 'transparent',
            color: '#d14343',
          },
          '&.MuiChip-outlinedWarning': {
            border: '1px solid #fb8500',
            backgroundColor: 'transparent',
            color: '#fb8500',
          },
          '&.MuiChip-outlinedInfo': {
            border: '1px solid #2d9fc5',
            backgroundColor: 'transparent',
            color: '#2d9fc5',
          },
        },
      },
    },

    // ALERTAS COSMOS - Colores según tokens
    MuiAlert: {
      styleOverrides: {
        standardError: {
          color: '#101840', // components.alert.error.color
          backgroundColor: '#f9e8e8', // components.alert.error.background
        },
        standardWarning: {
          color: '#101840', // components.alert.warning.color
          backgroundColor: '#fff0e0', // components.alert.warning.background
        },
        standardInfo: {
          color: '#101840', // components.alert.info.color
          backgroundColor: '#e6f3f8', // components.alert.info.background
        },
        standardSuccess: {
          color: '#101840', // components.alert.success.color
          backgroundColor: '#f2f9e7', // components.alert.success.background
        },
      },
    },

    // APP BAR COSMOS
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f6', // components.appBar.defaultFill
        },
      },
    },

    // AVATAR COSMOS
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ced1d4', // components.avatar.fill
          color: '#ffffff',
        },
      },
    },

    // SWITCH COSMOS
    MuiSwitch: {
      styleOverrides: {
        sizeSmall: {
          width: 40,
          height: 24,
          padding: 7,
          '& .MuiSwitch-switchBase': {
            padding: 4,
            '&.Mui-checked': {
              transform: 'translateX(16px)',
            },
          },
          '& .MuiSwitch-thumb': {
            width: 16,
            height: 16,
          },
          '& .MuiSwitch-track': {
            borderRadius: 12,
          },
        },
        thumb: {
          backgroundColor: '#fbfbfb', // components.switch.knobFillEnabled
        },
        track: {
          backgroundColor: '#000000', // components.switch.slideFill
          opacity: 0.38,
          '.Mui-checked.Mui-checked + &': {
            backgroundColor: '#5323de', // primary.main cuando está activado
            opacity: 0.54,
          },
        },
        switchBase: {
          '&.Mui-disabled': {
            '& .MuiSwitch-thumb': {
              backgroundColor: '#f5f5f6', // components.switch.knowFillDisabled
            },
          },
        },
      },
    },

    // RATING COSMOS
    MuiRating: {
      styleOverrides: {
        root: {
          '& .MuiRating-iconEmpty': {
            color: 'rgba(0, 0, 0, 0.23)', // components.rating.enabledBorder con transparencia
          },
          '& .MuiRating-iconFilled': {
            color: '#ffb400', // components.rating.activeFill
          },
          '& .MuiRating-iconHover': {
            color: '#ffb400',
          },
        },
      },
    },

    // SNACKBAR COSMOS
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#323232', // components.snackbar.fill
            color: '#ffffff',
          },
        },
      },
    },

    // TOOLTIP COSMOS
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#d6d5ff', // components.tooltip.fill (violeta claro)
          color: '#3a1a98', // components.tooltip.Text (violeta oscuro)
        },
        arrow: {
          color: '#d6d5ff', // Same as tooltip background
        },
      },
    },

    // BACKDROP COSMOS
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(240, 240, 240, 0.6)', // components.backdrop.fill con transparencia
        },
      },
    },

    // STEPPER COSMOS
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: '#ced1d4', // components.stepper.connector
        },
      },
    },

    // BREADCRUMBS COSMOS
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          '& .MuiBreadcrumbs-separator': {
            color: '#ced1d4', // Usando el color del stepper connector
          },
        },
      },
    },
    // ICON CONFIGURATION - Default to outlined variant
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-icons-outlined',
      },
      styleOverrides: {
        root: {
          // Ajuste de tamaños según iconos
          '&.MuiIcon-fontSizeSmall': {
            fontSize: '1.25rem', // 20px
          },
          '&.MuiIcon-fontSizeMedium': {
            fontSize: '1.5rem', // 24px
          },
          '&.MuiIcon-fontSizeLarge': {
            fontSize: '2.1875rem', // 35px
          },
        },
      },
    },

    // DATA GRID CONFIGURATION - Compact mode with 26px row height
    // @ts-ignore - MuiDataGrid is from @mui/x-data-grid package
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          '&.MuiDataGrid-root--densityCompact': {
            // Row and cell height configuration
            '& .MuiDataGrid-row': {
              minHeight: '26px !important',
              maxHeight: '26px !important',
            },
            '& .MuiDataGrid-cell': {
              minHeight: '26px !important',
              maxHeight: '26px !important',
              padding: `0 ${theme.spacing(1)}`,
              // Apply body3 typography from theme
              ...theme.typography.body3,
            },
            '& .MuiDataGrid-columnHeader': {
              minHeight: '26px !important',
              maxHeight: '26px !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              minHeight: '32px !important',
              maxHeight: '32px !important',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              // Apply body3 typography from theme
              ...theme.typography.body3,
              fontWeight: 500, // Medium weight for better hierarchy
              lineHeight: '26px', // Override lineHeight for header alignment
            },

            // Force all internal components to use smallest size
            // Chips - use small size from theme
            '& .MuiChip-root': {
              height: '20px',
              fontSize: theme.typography.caption.fontSize, // Use caption size from theme
              '& .MuiChip-label': {
                padding: `0 ${theme.spacing(0.75)}`,
              },
            },

            // Avatars - Smaller for compact mode
            '& .MuiAvatar-root': {
              width: '22px',
              height: '22px',
              fontSize: theme.typography.body3?.fontSize, // Use body3 size from theme
            },

            // Icons - small size
            '& .MuiSvgIcon-root': {
              fontSize: theme.typography.body1.fontSize, // Use body1 size for icons
            },

            // Icon Buttons - Smaller for compact mode
            '& .MuiIconButton-root': {
              padding: theme.spacing(0.25),
              '& .MuiSvgIcon-root': {
                fontSize: theme.typography.body2.fontSize, // Use body2 size from theme (14px = ~0.875rem)
              },
            },

            // Checkboxes - Slightly larger for better proportion
            '& .MuiCheckbox-root': {
              padding: theme.spacing(0.50), // Use theme spacing (4px = 0.50 * 8)
              '& .MuiSvgIcon-root': {
                fontSize: '1rem', // Slightly larger than default small
              },
            },

            // Selection checkboxes in first column
            '& .MuiDataGrid-checkboxInput': {
              '& .MuiSvgIcon-root': {
                fontSize: '1rem', // Match other checkboxes
              },
            },

            // Radio Buttons - Slightly larger for better proportion
            '& .MuiRadio-root': {
              padding: theme.spacing(0.50), // Use theme spacing (4px = 0.50 * 8)
              '& .MuiSvgIcon-root': {
                fontSize: '1rem', // Slightly larger, matching checkbox size
              },
            },

            // Switches - Scale down for DataGrid compact
            '& .MuiSwitch-root': {
              transform: 'scale(0.85)', // Scale down to 85% of original size
              margin: theme.spacing(-0.5), // Adjust margin to compensate for scale
            },

            // Buttons
            '& .MuiButton-root': {
              padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
              fontSize: theme.typography.body3?.fontSize, // Use body3 size from theme
              minHeight: '20px',
              lineHeight: 1.2,
            },

            // Select inputs
            '& .MuiSelect-root': {
              minHeight: '20px',
              fontSize: theme.typography.body3?.fontSize, // Use body3 size from theme
              padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
            },

            // Input fields
            '& .MuiInputBase-root': {
              minHeight: '20px',
              fontSize: theme.typography.body3?.fontSize, // Use body3 size from theme
              '& .MuiInputBase-input': {
                padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
              },
            },

            // Badge - Smaller for DataGrid compact mode
            '& .MuiBadge-badge': {
              height: '16px',
              minWidth: '16px',
              fontSize: theme.typography.body3?.fontSize, // Use body3 size from theme
              padding: `0 ${theme.spacing(0.375)}`,
              top: '-2px',
              right: '-2px',
            },

            // CircularProgress - Smaller for DataGrid compact mode
            '& .MuiCircularProgress-root': {
              width: '22px !important',
              height: '22px !important',
            },
            // Typography inside CircularProgress container
            '& .MuiCircularProgress-root ~ .MuiBox-root .MuiTypography-caption': {
              fontSize: `${parseFloat(theme.typography.caption.fontSize) * 0.67}rem !important`, // Smaller text for percentage (67% of caption)
            },

            // ToggleButton - Smaller for DataGrid compact mode
            '& .MuiToggleButton-root': {
              padding: `${theme.spacing(0.25)} ${theme.spacing(0.75)}`,
              fontSize: theme.typography.body3?.fontSize,
              minHeight: '20px',
              '&.MuiToggleButton-sizeSmall': {
                padding: `${theme.spacing(0.125)} ${theme.spacing(0.5)}`,
                fontSize: theme.typography.body3?.fontSize,
              },
            },
            '& .MuiToggleButtonGroup-root': {
              minHeight: '20px',
            },

            // Autocomplete - Adjust for DataGrid compact mode
            '& .MuiAutocomplete-root': {
              '& .MuiInputBase-root': {
                minHeight: '20px',
                paddingTop: 0,
                paddingBottom: 0,
              },
              '& .MuiAutocomplete-input': {
                fontSize: theme.typography.body3?.fontSize,
              },
              '& .MuiAutocomplete-endAdornment': {
                top: 'calc(50% - 0px)',
              },
            },

            // Alert - Smaller for DataGrid compact mode
            '& .MuiAlert-root': {
              padding: `0 ${theme.spacing(1)}`,
              minHeight: '20px',
              fontSize: theme.typography.body3?.fontSize,
              '& .MuiAlert-icon': {
                padding: `${theme.spacing(0.25)} 0`,
                marginRight: theme.spacing(0.75),
                fontSize: theme.typography.body2.fontSize, // Use body2 size from theme
              },
              '& .MuiAlert-message': {
                padding: `${theme.spacing(0.25)} 0`,
              },
            },

            // Skeleton - Smaller for DataGrid compact mode
            '& .MuiSkeleton-root': {
              height: '16px',
              borderRadius: '2px',
            },
          },

          // Standard mode with 32px row height
          '&.MuiDataGrid-root--densityStandard': {
            // Row and cell height configuration
            '& .MuiDataGrid-row': {
              minHeight: '32px !important',
              maxHeight: '32px !important',
            },
            '& .MuiDataGrid-cell': {
              minHeight: '32px !important',
              maxHeight: '32px !important',
              padding: `0 ${theme.spacing(1)}`,
              // Apply body2 typography from theme
              ...theme.typography.body2,
            },
            '& .MuiDataGrid-columnHeader': {
              minHeight: '32px !important',
              maxHeight: '32px !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              minHeight: '40px !important',
              maxHeight: '40px !important',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              // Apply body2 typography from theme
              ...theme.typography.body2,
              fontWeight: 500, // Medium weight for better hierarchy
              lineHeight: '32px', // Override lineHeight for header alignment
            },

            // Minimal component configuration - mostly use defaults
            // Only adjust components that need specific sizing for 32px rows

            // Checkboxes - Use default size but adjust padding slightly
            '& .MuiCheckbox-root': {
              padding: theme.spacing(0.75),
            },

            // Selection checkboxes in first column
            '& .MuiDataGrid-checkboxInput': {
              '& .MuiSvgIcon-root': {
                fontSize: '1.25rem', // Standard size for better visibility
              },
            },

            // Radio Buttons - Use default size but adjust padding slightly
            '& .MuiRadio-root': {
              padding: theme.spacing(0.75),
            },

            // Icon Buttons - Adjust padding for better fit
            '& .MuiIconButton-root': {
              padding: theme.spacing(0.5),
            },

            // Chips - Small size works well with 32px rows
            '& .MuiChip-root': {
              height: '24px',
            },

            // Avatars - Medium size for standard
            '& .MuiAvatar-root': {
              width: '26px',
              height: '26px',
              fontSize: theme.typography.body2.fontSize, // Use body2 size from theme
            },

            // Input fields - Adjusted for standard density
            '& .MuiInputBase-root': {
              minHeight: '26px',
              fontSize: theme.typography.body2.fontSize,
              '& .MuiInputBase-input': {
                padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
              },
            },

            // Select inputs - Adjusted for standard density
            '& .MuiSelect-root': {
              minHeight: '26px',
              fontSize: theme.typography.body2.fontSize,
              padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
            },

            // Autocomplete - Adjusted for standard density
            '& .MuiAutocomplete-root': {
              '& .MuiInputBase-root': {
                minHeight: '26px',
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: '26px !important', // Space for icons
              },
              '& .MuiAutocomplete-input': {
                fontSize: theme.typography.body2.fontSize,
                padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
              },
              '& .MuiAutocomplete-endAdornment': {
                top: 'calc(50% - 0px)',
                right: '4px',
                '& .MuiIconButton-root': {
                  padding: '4px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.2rem',
                  },
                },
              },
            },

            // ToggleButton - Adjusted for standard density
            '& .MuiToggleButton-root': {
              padding: `${theme.spacing(0.375)} ${theme.spacing(1)}`,
              fontSize: theme.typography.body2.fontSize,
              minHeight: '26px',
              '&.MuiToggleButton-sizeSmall': {
                padding: `${theme.spacing(0.25)} ${theme.spacing(0.75)}`,
                fontSize: theme.typography.body2.fontSize,
              },
            },
            '& .MuiToggleButtonGroup-root': {
              minHeight: '26px',
            },

            // Badge - Adjusted for standard density
            '& .MuiBadge-badge': {
              height: '16px',
              minWidth: '16px',
              fontSize: theme.typography.caption.fontSize,
              padding: `0 ${theme.spacing(0.5)}`,
              top: '-1px',
              right: '-1px',
            },

            // Alert - Adjusted for standard density
            '& .MuiAlert-root': {
              padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
              minHeight: '26px',
              fontSize: theme.typography.body2.fontSize,
              '& .MuiAlert-icon': {
                padding: `${theme.spacing(0.375)} 0`,
                marginRight: theme.spacing(0.75),
                fontSize: '1.125rem',
              },
              '& .MuiAlert-message': {
                padding: `${theme.spacing(0.375)} 0`,
              },
            },

            // CircularProgress - Adjusted for standard density
            '& .MuiCircularProgress-root': {
              width: '26px !important',
              height: '26px !important',
            },
            // Typography inside CircularProgress container
            '& .MuiCircularProgress-root ~ .MuiBox-root .MuiTypography-caption': {
              fontSize: '0.625rem !important', // Slightly larger than compact
            },

            // Skeleton - Adjusted for standard density
            '& .MuiSkeleton-root': {
              height: '20px',
              borderRadius: '4px',
            },
          },

          // Comfortable mode with 40px row height
          '&.MuiDataGrid-root--densityComfortable': {
            // Row and cell height configuration
            '& .MuiDataGrid-row': {
              minHeight: '40px !important',
              maxHeight: '40px !important',
            },
            '& .MuiDataGrid-cell': {
              minHeight: '40px !important',
              maxHeight: '40px !important',
              padding: `0 ${theme.spacing(2)}`,
              // Apply body1 typography from theme
              ...theme.typography.body1,
            },
            '& .MuiDataGrid-columnHeader': {
              minHeight: '40px !important',
              maxHeight: '40px !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              minHeight: '48px !important',
              maxHeight: '48px !important',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              // Apply body1 typography from theme
              ...theme.typography.body1,
              fontWeight: 500, // Medium weight for better hierarchy
              lineHeight: '40px', // Override lineHeight for header alignment
            },

            // Minimal component configuration for comfortable mode
            // Most components use their default sizes which work well with 40px rows

            // Checkboxes - Default size with comfortable padding
            '& .MuiCheckbox-root': {
              padding: theme.spacing(1),
            },

            // Selection checkboxes in first column
            '& .MuiDataGrid-checkboxInput': {
              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem', // Default size for comfortable mode
              },
            },

            // Radio Buttons - Default size with comfortable padding
            '& .MuiRadio-root': {
              padding: theme.spacing(1),
            },

            // Icon Buttons - Comfortable padding
            '& .MuiIconButton-root': {
              padding: theme.spacing(0.75),
            },

            // Chips - Default size works well
            '& .MuiChip-root': {
              height: '28px',
            },

            // Avatars - Larger for comfortable view
            '& .MuiAvatar-root': {
              width: '32px',
              height: '32px',
              fontSize: theme.typography.body1.fontSize, // Use body1 size from theme
            },

            // Input fields - Comfortable size
            '& .MuiInputBase-root': {
              minHeight: '32px',
              fontSize: theme.typography.body1.fontSize,
              '& .MuiInputBase-input': {
                padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
              },
            },

            // Select inputs - Comfortable size
            '& .MuiSelect-root': {
              minHeight: '32px',
              fontSize: theme.typography.body1.fontSize,
              padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
            },

            // Autocomplete - Comfortable size
            '& .MuiAutocomplete-root': {
              '& .MuiInputBase-root': {
                minHeight: '32px',
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: '32px !important',
              },
              '& .MuiAutocomplete-input': {
                fontSize: theme.typography.body1.fontSize,
                padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
              },
              '& .MuiAutocomplete-endAdornment': {
                top: 'calc(50% - 2px)',
                right: '4px',
                '& .MuiIconButton-root': {
                  padding: '4px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.5rem',
                  },
                },
              },
            },

            // ToggleButton - Comfortable size
            '& .MuiToggleButton-root': {
              padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
              fontSize: theme.typography.body1.fontSize,
              minHeight: '32px',
              '&.MuiToggleButton-sizeSmall': {
                padding: `${theme.spacing(0.375)} ${theme.spacing(1)}`,
                fontSize: theme.typography.body1.fontSize,
              },
            },
            '& .MuiToggleButtonGroup-root': {
              minHeight: '32px',
            },

            // CircularProgress - Comfortable size
            '& .MuiCircularProgress-root': {
              width: '32px !important',
              height: '32px !important',
            },
            '& .MuiCircularProgress-root ~ .MuiBox-root .MuiTypography-caption': {
              fontSize: '0.75rem !important',
            },

            // Alert - Comfortable size
            '& .MuiAlert-root': {
              padding: `${theme.spacing(0)} ${theme.spacing(1.5)}`,
              minHeight: '32px',
              fontSize: theme.typography.body1.fontSize,
              '& .MuiAlert-icon': {
                padding: `${theme.spacing(0.5)} 0`,
                marginRight: theme.spacing(1),
                fontSize: '1.5rem',
              },
              '& .MuiAlert-message': {
                padding: `${theme.spacing(0.5)} 0`,
              },
            },

            // Skeleton - Comfortable size
            '& .MuiSkeleton-root': {
              height: '28px',
              borderRadius: '4px',
            },
          },
        }),
      },
    },
  },
});

export default cosmosTheme;