import { ThemeOptions } from '@mui/material/styles';
import '../mui-theme-augmentation';
import CosmosTheme from '../ThemeCOSMOS.json';

/**
 * TEMA BASE - CONFIGURACIONES COMUNES PARA TODAS LAS MARCAS
 *
 * Este archivo contiene todas las configuraciones compartidas entre las diferentes marcas.
 * Incluye:
 * - Colores semánticos (error, warning, info, success)
 * - Configuraciones de grises
 * - Configuraciones de componentes (excepto colores específicos de marca)
 * - Configuraciones de espaciado y formas
 * - Configuraciones de DataGrid y otros componentes complejos
 */

export const baseThemeConfig: ThemeOptions = {
  // ============================================================================
  // SOMBRAS PERSONALIZADAS - Suaves con tono azul-grisáceo para light theme
  // ============================================================================
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(93, 109, 126, 0.16), 0px 1px 1px 0px rgba(93, 109, 126, 0.12), 0px 1px 3px 0px rgba(93, 109, 126, 0.08)',
    '0px 3px 1px -2px rgba(93, 109, 126, 0.16), 0px 2px 2px 0px rgba(93, 109, 126, 0.12), 0px 1px 5px 0px rgba(93, 109, 126, 0.08)',
    '0px 3px 3px -2px rgba(93, 109, 126, 0.16), 0px 3px 4px 0px rgba(93, 109, 126, 0.12), 0px 1px 8px 0px rgba(93, 109, 126, 0.08)',
    '0px 2px 4px -1px rgba(93, 109, 126, 0.16), 0px 4px 5px 0px rgba(93, 109, 126, 0.12), 0px 1px 10px 0px rgba(93, 109, 126, 0.08)',
    '0px 3px 5px -1px rgba(93, 109, 126, 0.17), 0px 5px 8px 0px rgba(93, 109, 126, 0.13), 0px 1px 14px 0px rgba(93, 109, 126, 0.08)',
    '0px 3px 5px -1px rgba(93, 109, 126, 0.17), 0px 6px 10px 0px rgba(93, 109, 126, 0.13), 0px 1px 18px 0px rgba(93, 109, 126, 0.08)',
    '0px 4px 5px -2px rgba(93, 109, 126, 0.17), 0px 7px 10px 1px rgba(93, 109, 126, 0.13), 0px 2px 16px 1px rgba(93, 109, 126, 0.08)',
    '0px 5px 5px -3px rgba(93, 109, 126, 0.18), 0px 8px 10px 1px rgba(93, 109, 126, 0.14), 0px 3px 14px 2px rgba(93, 109, 126, 0.09)',
    '0px 5px 6px -3px rgba(93, 109, 126, 0.18), 0px 9px 12px 1px rgba(93, 109, 126, 0.14), 0px 3px 16px 2px rgba(93, 109, 126, 0.09)',
    '0px 6px 6px -3px rgba(93, 109, 126, 0.18), 0px 10px 14px 1px rgba(93, 109, 126, 0.14), 0px 4px 18px 3px rgba(93, 109, 126, 0.09)',
    '0px 6px 7px -4px rgba(93, 109, 126, 0.19), 0px 11px 15px 1px rgba(93, 109, 126, 0.14), 0px 4px 20px 3px rgba(93, 109, 126, 0.09)',
    '0px 7px 8px -4px rgba(93, 109, 126, 0.19), 0px 12px 17px 2px rgba(93, 109, 126, 0.15), 0px 5px 22px 4px rgba(93, 109, 126, 0.09)',
    '0px 7px 8px -4px rgba(93, 109, 126, 0.19), 0px 13px 19px 2px rgba(93, 109, 126, 0.15), 0px 5px 24px 4px rgba(93, 109, 126, 0.09)',
    '0px 7px 9px -4px rgba(93, 109, 126, 0.20), 0px 14px 21px 2px rgba(93, 109, 126, 0.15), 0px 5px 26px 4px rgba(93, 109, 126, 0.10)',
    '0px 8px 9px -5px rgba(93, 109, 126, 0.20), 0px 15px 22px 2px rgba(93, 109, 126, 0.15), 0px 6px 28px 5px rgba(93, 109, 126, 0.10)',
    '0px 8px 10px -5px rgba(93, 109, 126, 0.20), 0px 16px 24px 2px rgba(93, 109, 126, 0.16), 0px 6px 30px 5px rgba(93, 109, 126, 0.10)',
    '0px 8px 11px -5px rgba(93, 109, 126, 0.21), 0px 17px 26px 2px rgba(93, 109, 126, 0.16), 0px 6px 32px 5px rgba(93, 109, 126, 0.10)',
    '0px 9px 11px -5px rgba(93, 109, 126, 0.21), 0px 18px 28px 2px rgba(93, 109, 126, 0.16), 0px 7px 34px 6px rgba(93, 109, 126, 0.10)',
    '0px 9px 12px -6px rgba(93, 109, 126, 0.21), 0px 19px 29px 2px rgba(93, 109, 126, 0.16), 0px 7px 36px 6px rgba(93, 109, 126, 0.11)',
    '0px 10px 13px -6px rgba(93, 109, 126, 0.22), 0px 20px 31px 3px rgba(93, 109, 126, 0.17), 0px 8px 38px 7px rgba(93, 109, 126, 0.11)',
    '0px 10px 13px -6px rgba(93, 109, 126, 0.22), 0px 21px 33px 3px rgba(93, 109, 126, 0.17), 0px 8px 40px 7px rgba(93, 109, 126, 0.11)',
    '0px 10px 14px -6px rgba(93, 109, 126, 0.22), 0px 22px 35px 3px rgba(93, 109, 126, 0.17), 0px 8px 42px 7px rgba(93, 109, 126, 0.11)',
    '0px 11px 14px -7px rgba(93, 109, 126, 0.23), 0px 23px 36px 3px rgba(93, 109, 126, 0.18), 0px 9px 44px 8px rgba(93, 109, 126, 0.12)',
    '0px 11px 15px -7px rgba(93, 109, 126, 0.23), 0px 24px 38px 3px rgba(93, 109, 126, 0.18), 0px 9px 46px 8px rgba(93, 109, 126, 0.12)',
  ] as any,

  // ============================================================================
  // PALETA DE COLORES COMPARTIDOS
  // ============================================================================
  palette: {
    mode: 'light',

    // COLORES SEMÁNTICOS - Compartidos entre todas las marcas
    error: {
      50: CosmosTheme['brand-colors'].red[50].$value,
      100: CosmosTheme['brand-colors'].red[100].$value,
      200: CosmosTheme['brand-colors'].red[200].$value,
      300: CosmosTheme['brand-colors'].red[300].$value,
      400: CosmosTheme['brand-colors'].red[400].$value,
      500: CosmosTheme['brand-colors'].red[500].$value,
      600: CosmosTheme['brand-colors'].red[600].$value,
      700: CosmosTheme['brand-colors'].red[700].$value,
      800: CosmosTheme['brand-colors'].red[800].$value,
      900: CosmosTheme['brand-colors'].red[900].$value,
      main: CosmosTheme['brand-colors'].red[700].$value,
      light: CosmosTheme['brand-colors'].red[400].$value,
      dark: CosmosTheme['brand-colors'].red[800].$value,
      contrastText: CosmosTheme.palette.error.contrastText.$value.Light,
    },
    warning: {
      50: CosmosTheme['brand-colors'].orange[50].$value,
      100: CosmosTheme['brand-colors'].orange[100].$value,
      200: CosmosTheme['brand-colors'].orange[200].$value,
      300: CosmosTheme['brand-colors'].orange[300].$value,
      400: CosmosTheme['brand-colors'].orange[400].$value,
      500: CosmosTheme['brand-colors'].orange[500].$value,
      600: CosmosTheme['brand-colors'].orange[600].$value,
      700: CosmosTheme['brand-colors'].orange[700].$value,
      800: CosmosTheme['brand-colors'].orange[800].$value,
      900: CosmosTheme['brand-colors'].orange[900].$value,
      main: CosmosTheme['brand-colors'].orange[500].$value,
      light: CosmosTheme['brand-colors'].orange[400].$value,
      dark: CosmosTheme['brand-colors'].orange[900].$value,
      contrastText: CosmosTheme.palette.warning.contrastText.$value.Light,
    },
    info: {
      50: CosmosTheme['brand-colors'].lightBlue[50].$value,
      100: CosmosTheme['brand-colors'].lightBlue[100].$value,
      200: CosmosTheme['brand-colors'].lightBlue[200].$value,
      300: CosmosTheme['brand-colors'].lightBlue[300].$value,
      400: CosmosTheme['brand-colors'].lightBlue[400].$value,
      500: CosmosTheme['brand-colors'].lightBlue[500].$value,
      600: CosmosTheme['brand-colors'].lightBlue[600].$value,
      700: CosmosTheme['brand-colors'].lightBlue[700].$value,
      800: CosmosTheme['brand-colors'].lightBlue[800].$value,
      900: CosmosTheme['brand-colors'].lightBlue[900].$value,
      main: CosmosTheme['brand-colors'].lightBlue[700].$value,
      light: CosmosTheme['brand-colors'].lightBlue[500].$value,
      dark: CosmosTheme['brand-colors'].lightBlue[900].$value,
      contrastText: CosmosTheme.palette.info.contrastText.$value.Light,
    },
    success: {
      50: CosmosTheme['brand-colors'].green[50].$value,
      100: CosmosTheme['brand-colors'].green[100].$value,
      200: CosmosTheme['brand-colors'].green[200].$value,
      300: CosmosTheme['brand-colors'].green[300].$value,
      400: CosmosTheme['brand-colors'].green[400].$value,
      500: CosmosTheme['brand-colors'].green[500].$value,
      600: CosmosTheme['brand-colors'].green[600].$value,
      700: CosmosTheme['brand-colors'].green[700].$value,
      800: CosmosTheme['brand-colors'].green[800].$value,
      900: CosmosTheme['brand-colors'].green[900].$value,
      main: CosmosTheme['brand-colors'].green[800].$value,
      light: CosmosTheme['brand-colors'].green[400].$value,
      dark: CosmosTheme['brand-colors'].green[900].$value,
      contrastText: CosmosTheme.palette.success.contrastText.$value.Light,
    },

    // COLORES SECUNDARIOS - Cyan compartido
    secondary: {
      50: CosmosTheme['brand-colors'].secondary[50].$value,
      100: CosmosTheme['brand-colors'].secondary[100].$value,
      200: CosmosTheme['brand-colors'].secondary[200].$value,
      300: CosmosTheme['brand-colors'].secondary[300].$value,
      400: CosmosTheme['brand-colors'].secondary[400].$value,
      500: CosmosTheme['brand-colors'].secondary[500].$value,
      600: CosmosTheme['brand-colors'].secondary[600].$value,
      700: CosmosTheme['brand-colors'].secondary[700].$value,
      800: CosmosTheme['brand-colors'].secondary[800].$value,
      900: CosmosTheme['brand-colors'].secondary[900].$value,
      main: CosmosTheme['brand-colors'].secondary[500].$value,
      light: CosmosTheme['brand-colors'].secondary[300].$value,
      dark: CosmosTheme['brand-colors'].secondary[700].$value,
      contrastText: CosmosTheme.palette.secondary.contrastText.$value.Light,
    },

    // COLORES GRISES - Paleta completa compartida
    grey: {
      50: CosmosTheme['brand-colors'].grey[50].$value,
      100: CosmosTheme['brand-colors'].grey[100].$value,
      200: CosmosTheme['brand-colors'].grey[200].$value,
      300: CosmosTheme['brand-colors'].grey[300].$value,
      400: CosmosTheme['brand-colors'].grey[400].$value,
      500: CosmosTheme['brand-colors'].grey[500].$value,
      600: CosmosTheme['brand-colors'].grey[600].$value,
      700: CosmosTheme['brand-colors'].grey[700].$value,
      800: CosmosTheme['brand-colors'].grey[800].$value,
      900: CosmosTheme['brand-colors'].grey[900].$value,
    },

    // COLORES DE FONDO Y SUPERFICIE
    background: {
      default: CosmosTheme.palette.background.default.$value.Light,
      paper: CosmosTheme.palette.background.paper.$value.Light,
    },

    // COLORES DE TEXTO
    text: {
      primary: CosmosTheme.palette.text.primary.$value.Light,
      secondary: CosmosTheme.palette.text.secondary.$value.Light,
      disabled: CosmosTheme.palette.text.disabled.$value.Light,
    },

    // DIVISORES Y ELEMENTOS DE ACCIÓN
    // Nota: Los temas dark sobrescriben este valor con rgba(255, 255, 255, 0.20)
    divider: CosmosTheme.palette.divider.$value.Light, // Azulado basado en text.primary (#101840)
    action: {
      active: CosmosTheme.palette.action.active.$value.Light,
      hover: CosmosTheme.palette.action.hover.$value.Light,
      selected: CosmosTheme.palette.action.selected.$value.Light,
      disabled: CosmosTheme.palette.action.disabled.$value.Light,
      disabledBackground: CosmosTheme.palette.action.disabledBackground.$value.Light,
      focus: CosmosTheme.palette.action.focus.$value.Light,
    },
  },

  // ============================================================================
  // TIPOGRAFÍA BASE - COMPARTIDA
  // ============================================================================
  typography: {
    // body3 es una variante personalizada compartida por todas las marcas
    body3: {
      fontSize: `${CosmosTheme.typography.body[3].fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.body[3].fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.body[3].lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.body[3].letterSpacing.$value}px`,
    },
  },

  // ============================================================================
  // ESPACIADO Y FORMAS - COMPARTIDO
  // ============================================================================
  spacing: 8,
  shape: {
    borderRadius: CosmosTheme.shape.borderRadius.$value,
  },

  // ============================================================================
  // COMPONENTES BASE - CONFIGURACIONES COMPARTIDAS
  // ============================================================================
  components: {
    // ========================================================================
    // COMPONENTES DE INTERACCIÓN
    // ========================================================================

    // BOTONES - Configuración base sin colores específicos
    // - Tamaño por defecto: small para consistencia con el sistema
    // - Text transform: none para evitar capitalización automática
    // - Paddings y fuentes específicos por tamaño
    MuiButton: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          textTransform: 'none',
          borderRadius: CosmosTheme.shape.borderRadius.$value,
          ...(ownerState.size === 'small' && {
            paddingBlock: `${CosmosTheme._components.muiButton.small.py.$value}px`,
            paddingInline: `${CosmosTheme._components.muiButton.small.px.$value}px`,
            fontSize: `${CosmosTheme.typography._components.button.small.fontSize.$value}px`,
            lineHeight: `${CosmosTheme.typography._components.button.small.lineHeight.$value}px`,
          }),
          ...(ownerState.size === 'medium' && {
            paddingBlock: `${CosmosTheme._components.muiButton.medium.py.$value}px`,
            paddingInline: `${CosmosTheme._components.muiButton.medium.px.$value}px`,
            fontSize: `${CosmosTheme.typography._components.button.medium.fontSize.$value}px`,
            lineHeight: `${CosmosTheme.typography._components.button.medium.lineHeight.$value}px`,
          }),
          ...(ownerState.size === 'large' && {
            paddingBlock: `${CosmosTheme._components.muiButton.large.py.$value}px`,
            paddingInline: `${CosmosTheme._components.muiButton.large.px.$value}px`,
            fontSize: `${CosmosTheme.typography._components.button.large.fontSize.$value}px`,
            lineHeight: `${CosmosTheme.typography._components.button.large.lineHeight.$value}px`,
          }),
        }),
      },  
    },

    // ========================================================================
    // COMPONENTES DE FORMULARIO E INPUTS
    // ========================================================================

    // CAMPOS DE ENTRADA - Configuración base para todos los inputs
    // - Padding vertical ajustado para size small (5.94px)
    // - Margin por defecto: none para control granular
    MuiInputBase: {
      defaultProps: {
        margin: "none",
      },
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": {
            paddingBlock: `${CosmosTheme._components.muiInput.muiInputBase.py.$value}px`,
          },
        },
      },
    },

    // OUTLINED INPUT - Borde hover personalizado
    // - Borde normal: usa palette.divider para consistencia
    // - Hover: usa text.primary para mayor contraste
    // - Excluye el estado focused para mantener el color primary
    // - Typography body2 para todos los inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette._components.input.outlined.root.$value.Light
              : CosmosTheme.palette._components.input.outlined.root.$value.Dark
          },
        }),
        notchedOutline: ({ theme }: any) => ({
          borderColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.input.outlined.notchedOutline.$value.Light
            : CosmosTheme.palette._components.input.outlined.notchedOutline.$value.Dark
        }),
        input: /*({ theme }: any) =>*/ ({
          //...theme.typography.body2, //Validar como aplicar
          fontSize: `${CosmosTheme._components.muiInput.muiOutlinedInput.input.fontSize.$value}px`,
          fontWeight: `${CosmosTheme._components.muiInput.muiOutlinedInput.input.fontWeight.$value}px`,
          lineHeight: `${CosmosTheme._components.muiInput.muiOutlinedInput.input.lineHeight.$value}px`,
          letterSpacing: `${CosmosTheme._components.muiInput.muiOutlinedInput.input.letterSpacing.$value}px`,
        }),
      },
    },

    // FILLED INPUT - Usa divider para la línea inferior
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          '&:before': {
            borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette._components.input.filled.enabledFill.$value.Light
              : CosmosTheme.palette._components.input.filled.enabledFill.$value.Dark,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.primary._states.outlinedBorder.$value.Light
              : CosmosTheme.palette.primary._states.outlinedBorder.$value.Dark
          },
        }),
      },
    },

    // STANDARD INPUT - Usa divider para la línea inferior
    MuiInput: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          '&:before': {
            borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.divider.$value.Light
              : CosmosTheme.palette.divider.$value.Dark,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.primary._states.outlinedBorder.$value.Light
              : CosmosTheme.palette.primary._states.outlinedBorder.$value.Dark
          },
        }),
      },
    },

    // ETIQUETAS DE CAMPOS (LABELS)
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        asterisk: ({ theme }: any) => ({
          color: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.input.label.asterisk.$value.Light
            : CosmosTheme.palette._components.input.label.asterisk.$value.Dark
        }),
        error: ({ theme }: any) => ({
          color: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.input.label.error.$value.Light
            : CosmosTheme.palette._components.input.label.error.$value.Dark
        }),
        root: {
          fontSize: `${CosmosTheme._components.muiInput.muiInputLabel.root.fontSize.$value}px`,
          lineHeight: `${CosmosTheme._components.muiInput.muiInputLabel.root.lineHeight.$value}px`,
        },
        filled: {
          "&.MuiInputLabel-filled.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)": {
            transform: "translate(12px, 15px) scale(1)",
          },
          "&.MuiInputLabel-filled.MuiInputLabel-sizeMedium:not(.MuiInputLabel-shrink)": {
            transform: "translate(12px, 19px) scale(1)",
          },
        },
        standard: {
          "&.MuiInputLabel-standard.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)": {
            transform: "translate(0, 14px) scale(1)",
          },
          "&.MuiInputLabel-standard.MuiInputLabel-sizeMedium:not(.MuiInputLabel-shrink)": {
            transform: "translate(0, 16px) scale(1)",
          },
        },
        outlined: {
          "&.MuiInputLabel-outlined.MuiInputLabel-sizeSmall": {
            transform: "translate(14px, 7px) scale(1)",
          },
          "&.MuiInputLabel-outlined": {
            transform: "translate(14px, 14px) scale(1)",
            "&.MuiInputLabel-shrink": {
              transform: "translate(16px, -7px) scale(0.8)",
            },
          },
        },
      },
    },

    // CAMPOS DE TEXTO COMPLETOS
    MuiTextField: {
      defaultProps: {
        size: 'small'
      },
      variants: [
        {
          props: { variant: "standard", margin: "none" },
          style: {
            ".MuiInputBase-input.MuiInputBase-inputSizeSmall": {
              padding: `${CosmosTheme._components.muiTextField.standard.padding.$value}px`,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          '& .MuiInputAdornment-root': {
            '& .MuiIconButton-root': {
              padding: `${CosmosTheme._components.muiTextField.root.padding.$value}px !important`,
              '& .MuiSvgIcon-root': {
                fontSize: `${CosmosTheme._components.muiTextField.root.muiSvgIcon.$value}px`,
              },
            },
            '& .MuiSvgIcon-root': {
              fontSize: `${CosmosTheme._components.muiTextField.root.muiSvgIcon.$value}px`,
            },
          },
        }
      },
    },

    // CONTROLES DE FORMULARIO
    MuiFormControl: {
      defaultProps: {
        size: 'small'
      },
    },

    // SELECT - Typography body2 para todos los selects
    MuiSelect: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        select: {
          fontSize: `${CosmosTheme._components.muiSelect.fontSize.$value}px`,
        },
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
    // AUTOCOMPLETE - Configuración para size small y chips
    // - minHeight: 32px para consistencia con TextField small
    // - Chips xsmall para size small, chips small para size medium
    // - Padding reducido y márgenes ajustados para mejor layout
    // - Typography body2 para consistencia con otros inputs
    MuiAutocomplete: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            '&.MuiInputBase-sizeSmall': {
              minHeight: `${CosmosTheme._components.muiAutocomplete.small.minHeight.$value}px`,
              paddingBlock: `${CosmosTheme._components.muiAutocomplete.small.py.$value}px`,
              paddingInline: `${CosmosTheme._components.muiAutocomplete.small.px.$value}px`,
              '& .MuiInputBase-input': {
                paddingBlock: `${CosmosTheme._components.muiAutocomplete.small.inputBase.py.$value}px`,
                paddingInline: `${CosmosTheme._components.muiAutocomplete.small.inputBase.px.$value}px`,
                fontSize: `${CosmosTheme._components.muiAutocomplete.small.inputBase.fontSize.$value}px`,
              },
              // Chips compactos para Autocomplete small
              '& .MuiChip-root': {
                height: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.height.$value}px`,
                fontSize: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.fontSize.$value}px`,
                margin: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.margin.$value}px`,
                '& .MuiChip-label': {
                  paddingBlock: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.label.py.$value}px`,
                  paddingInline: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.label.px.$value}px`,
                  lineHeight: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.label.lineHeight.$value}px`,
                },
                '& .MuiChip-deleteIcon': {
                  fontSize: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.deleteIcon.fontSize.$value}px`,
                  marginTop: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.deleteIcon.my.$value}px`,
                  marginBottom: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.deleteIcon.my.$value}px`,
                  marginRight: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.deleteIcon.marignRight.$value}px`,
                  marginLeft: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.deleteIcon.marignLeft.$value}px`,
                },
                '& .MuiChip-icon': {
                  fontSize: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.icon.fontSize.$value}px`,
                  marginLeft: `${CosmosTheme._components.muiAutocomplete.small._componentes.chip.icon.marignLeft.$value}px`,
                },
              },
            },
          },
        },
        inputRoot: {
          '&.MuiInputBase-sizeSmall': {
            minHeight: `${CosmosTheme._components.muiAutocomplete.input.small.minHeight.$value}px`,
            paddingBlock: `${CosmosTheme._components.muiAutocomplete.input.small.py.$value}px`,
            paddingInline: `${CosmosTheme._components.muiAutocomplete.input.small.px.$value}px`,
            '& .MuiInputBase-input': {
              padding: '4px 0',
              paddingBlock: `${CosmosTheme._components.muiAutocomplete.input.small.base.py.$value}px`,
              paddingInline: `${CosmosTheme._components.muiAutocomplete.input.small.base.px.$value}px`,
              fontSize: `${CosmosTheme._components.muiAutocomplete.input.small.base.fontSize.$value}px`,
            },
          },
        },
        input: {
          fontSize: `${CosmosTheme._components.muiAutocomplete.input.fontSize.$value}px`,
        },
      },
    },
    MuiTabs: {  
      styleOverrides: {
        root: {
          minHeight: `${CosmosTheme._components.muiTabs.minHeight.$value}px`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: `${CosmosTheme._components.muiTab.minHeight.$value}px`,
        },
      },
    },

    // ========================================================================
    // COMPONENTES DE FEEDBACK Y NOTIFICACIÓN
    // ========================================================================

    // ALERTAS - Colores semánticos compartidos
    // - Usa colores del tema dinámicamente adaptados al modo (light/dark)
    // - Background: usa alpha para transparencia que funciona en ambos modos
    // - Text: hereda del componente para mantener contraste correcto
    MuiAlert: {
      styleOverrides: {
        standardError: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.alert.error.background.$value.Light
            : CosmosTheme.palette._components.alert.error.background.$value.Dark
        }),
        standardWarning: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.alert.warning.background.$value.Light
            : CosmosTheme.palette._components.alert.warning.background.$value.Dark
        }),
        standardInfo: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.alert.info.background.$value.Light
            : CosmosTheme.palette._components.alert.info.background.$value.Dark
        }),
        standardSuccess: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.alert.success.background.$value.Light
            : CosmosTheme.palette._components.alert.success.background.$value.Dark
        }),
      },
    },

    // APP BAR
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.appBar.defaultFill.$value.Light
            : CosmosTheme.palette._components.appBar.defaultFill.$value.Dark
        }),
      },
    },

    // AVATAR
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.avatar.fill.$value.Light
            : CosmosTheme.palette._components.avatar.fill.$value.Dark,
          color: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.avatar.color.$value.Light
            : CosmosTheme.palette._components.avatar.color.$value.Dark
        }),
      },
    },  

    // SWITCH - Configuración base con colores dinámicos
    MuiSwitch: {
      styleOverrides: {
        sizeSmall: {  
          width: `${CosmosTheme._components.muiSwitch.width.$value}px`,
          height: `${CosmosTheme._components.muiSwitch.height.$value}px`,
          padding: `${CosmosTheme._components.muiSwitch.padding.$value}px`,
          '& .MuiSwitch-switchBase': {
            padding: `${CosmosTheme._components.muiSwitch.base.padding.$value}px`,
            '&.Mui-checked': {
              transform: 'translateX(16px)',
            },
          },
          '& .MuiSwitch-thumb': {
            width: `${CosmosTheme._components.muiSwitch.thumb.width.$value}px`,
            height: `${CosmosTheme._components.muiSwitch.thumb.height.$value}px`,
          },
          '& .MuiSwitch-track': {
            borderRadius: `${CosmosTheme._components.muiSwitch.track.borderRadius.$value}px`,
          },
        },
        thumb: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.switch.thumb.$value.Light
            : CosmosTheme.palette._components.switch.thumb.$value.Dark
        }),
        track: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.switch.track.$value.Light
            : CosmosTheme.palette._components.switch.track.$value.Dark,
          opacity: 0.5,
          '.Mui-checked.Mui-checked + &': {
            backgroundColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.primary.main.$value.Light
              : CosmosTheme.palette.primary.main.$value.Dark,
            opacity: 1,
          },
        }),
        switchBase: ({ theme, ownerState }: any) => ({
          '&.Mui-disabled': {
            '& .MuiSwitch-thumb': {
              backgroundColor: theme.palette.mode === 'light'
                ? CosmosTheme.palette._components.switch.thumb.$value.Light
                : CosmosTheme.palette._components.switch.thumb.$value.Dark
            },
          },
          // Configuración para cada color semántico // Pendiente por confirmar info
          '&.Mui-checked': {
            '& + .MuiSwitch-track': {
              backgroundColor: ownerState.color === 'default'
                ? CosmosTheme.palette._components.switch.track.$value.Light
                : theme.palette[ownerState.color]?.main || CosmosTheme.palette._components.switch.track.$value,
              opacity: 1,
            },
          },
        }),
        colorPrimary: ({ theme }: any) => ({
          '&.Mui-checked': {
            color: theme.palette.common.white,
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'light'
                ? CosmosTheme.palette.primary.main.$value.Light
                : CosmosTheme.palette.primary.main.$value.Dark,
              opacity: 1,
            },
          },
        }),
        colorSecondary: ({ theme }: any) => ({
          '&.Mui-checked': {
            color: theme.palette.common.white,
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'light'
                ? CosmosTheme.palette.secondary.main.$value.Light
                : CosmosTheme.palette.secondary.main.$value.Dark,
              opacity: 1,
            },
          },
        }),
        // Nota: colorError, colorWarning, colorInfo, colorSuccess no son variantes estándar del Switch
        // Se pueden manejar con clases personalizadas si es necesario
      },
    },

    // RATING
    MuiRating: {
      styleOverrides: {
        root: ({theme}: any) => ({
          '& .MuiRating-iconEmpty':{
            color: theme.palette.mode === 'light'
              ? CosmosTheme.palette._components.rating.enabledBorder.$value.Light
              : CosmosTheme.palette._components.rating.enabledBorder.$value.Dark,
          },
          '& .MuiRating-iconFilled':{
            color: theme.palette.mode === 'light'
              ? CosmosTheme['brand-colors'].orange[500].$value
              : CosmosTheme['brand-colors'].orange[400].$value,
          }
        }),
      },
    },

    // SNACKBAR
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': ({ theme }: any) => ({
            backgroundColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette._components.snackbar.fill.$value.Light
              : CosmosTheme.palette._components.snackbar.fill.$value.Dark,
            color: theme.palette.mode === 'light'
              ? CosmosTheme.palette._components.snackbar.color.$value.Light
              : CosmosTheme.palette._components.snackbar.color.$value.Dark,
          }),
        },
      },
    },

    // TOOLTIP - Colores invertidos para contraste
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.tooltip.fill.$value.Light
            : CosmosTheme.palette._components.tooltip.fill.$value.Dark,
          color: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.tooltip.color.$value.Light 
            : CosmosTheme.palette._components.tooltip.color.$value.Dark,
        }),
        arrow: ({ theme }: any) => ({
          color: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.tooltip.fill.$value.Light
            : CosmosTheme.palette._components.tooltip.fill.$value.Dark,
        }),
      },
    },

    // BACKDROP
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          backgroundColor: theme.palette.mode === 'light'
            ? CosmosTheme.palette._components.backdrop.fill.$value.Light
            : CosmosTheme.palette._components.backdrop.fill.$value.Dark
        }),
      },
    },

    // ========================================================================
    // COMPONENTES DE DATOS Y DISPLAY
    // ========================================================================

    // CHIPS - Configuración simplificada que se adapta al modo
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: `${CosmosTheme._components.muiChip.borderRadius.$value}px`,
          fontSize: `${CosmosTheme._components.muiChip.fontSize.$value}px`,
          lineHeight: `${CosmosTheme._components.muiChip.lineHeight.$value}px`,
        },
        outlined: ({ theme }: any) => ({
          '&.MuiChip-colorDefault': {
            borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.divider.$value.Light
              : CosmosTheme.palette.divider.$value.Dark,
          },
        }),
      },
    },

    // CARD - Usa divider para variant outlined
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          '&.MuiPaper-outlined': {
            borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.divider.$value.Light
              : CosmosTheme.palette.divider.$value.Dark,
          },
        }),
      },
    },

    // PAPER - Usa divider para variant outlined
    MuiPaper: {
      styleOverrides: {
        outlined: ({ theme }: any) => ({
          borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.divider.$value.Light
              : CosmosTheme.palette.divider.$value.Dark,  
        }),
      },
    },

    // ACCORDION - Usa divider para bordes
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          '&:before': {
            backgroundColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.divider.$value.Light
              : CosmosTheme.palette.divider.$value.Dark,
          },
        }),
      },
    },

    // STEPPER
    MuiStepConnector: {
      styleOverrides: {
        line: ({ theme }: any) => ({
          borderColor: theme.palette.mode === 'light'
              ? CosmosTheme.palette.divider.$value.Light
              : CosmosTheme.palette.divider.$value.Dark,
        }),
      },
    },

    // BREADCRUMBS
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          '& .MuiBreadcrumbs-separator': ({ theme }: any) => ({
            color: theme.palette.mode === 'light'
              ? CosmosTheme.palette.divider.$value.Light
              : CosmosTheme.palette.divider.$value.Dark,
          }),
        },
      },
    },

    // ========================================================================
    // COMPONENTES COMPLEJOS Y NAVEGACIÓN
    // ========================================================================

    // DATA GRID - Configuración completa para todos los modos de densidad
    // - Compact: 26px altura, body3 typography, componentes ultra-compactos
    // - Standard: 32px altura, body2 typography, tamaños normales
    // - Comfortable: 40px altura, body1 typography, componentes espaciosos
    // - Todos los componentes internos ajustados por modo (chips, avatars, buttons, etc.)
    // @ts-ignore
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          border: theme.palette.mode === 'light'
              ? `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.border.$value.Light}`
              : `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.border.$value.Dark}`,
          '& .MuiDataGrid-cell': {
            borderBottom: theme.palette.mode === 'light'
              ? `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.cell.borderBottom.$value.Light}`
              : `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.cell.borderBottom.$value.Dark}`,
            borderRight: theme.palette.mode === 'light'
              ? `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.cell.borderRight.$value.Light}`
              : `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.cell.borderRight.$value.Dark}`,
            '&.Mui-selected, &:focus, &:focus-within, &[aria-selected="true"]': {
              borderRadius: `${CosmosTheme._components.muiDataGrid.root.borderRadius.$value}px`,
              overflow: 'hidden',
            },
          },
          '& .MuiDataGrid-row': {
            '&.Mui-selected .MuiDataGrid-cell, &:hover .MuiDataGrid-cell': {
              borderRadius: `${CosmosTheme._components.muiDataGrid.root.row.borderRadius.$value}px`,
              overflow: 'hidden',
            },
            '&:last-child .MuiDataGrid-cell': {
              borderBottom: theme.palette.mode === 'light'
              ? `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.cell.borderBottom.$value.Light}`
              : `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.cell.borderBottom.$value.Dark}`,
            },
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: theme.palette.mode === 'light'
              ? `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.columnHeaders.borderBottom.$value.Light}`
              : `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.columnHeaders.borderBottom.$value.Dark}`,
            backgroundColor: theme.palette.mode === 'light'
              ? `${CosmosTheme.palette._components.dataGrid.root.columnHeaders.backgroundColor.$value.Light}`
              : `${CosmosTheme.palette._components.dataGrid.root.columnHeaders.backgroundColor.$value.Dark}`,
            borderRadius: `${CosmosTheme._components.muiDataGrid.root.columnHeaders.borderRadius.$value}px`,
            overflow: 'hidden',
          },
          '& .MuiDataGrid-columnSeparator': {
            color: theme.palette.mode === 'light'
              ? `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.columnSeparator.color.$value.Light}`
              : `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.columnSeparator.color.$value.Dark}`,
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: theme.palette.mode === 'light'
              ? `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.footerContainer.borderTop.$value.Light}`
              : `0.75px solid ${CosmosTheme.palette._components.dataGrid.root.footerContainer.borderTop.$value.Dark}`,
          },
          // COMPACT MODE - 26px row height
          '&.MuiDataGrid-root--densityCompact': {
            '& .MuiDataGrid-row': {
              minHeight: `${CosmosTheme._components.muiDataGrid.compact.row.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.compact.row.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-cell': {
              minHeight: `${CosmosTheme._components.muiDataGrid.compact.cell.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.compact.cell.maxHeight.$value}px !important`,
              paddingBlock: `${CosmosTheme._components.muiDataGrid.compact.cell.py.$value}px !important`, 
              paddingInline: `${CosmosTheme._components.muiDataGrid.compact.cell.px.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact.cell.fontSize.$value}px !important`,
            },
            '& .MuiDataGrid-columnHeader': {
              minHeight: `${CosmosTheme._components.muiDataGrid.compact.columnHeader.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.compact.columnHeader.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              minHeight: `${CosmosTheme._components.muiDataGrid.compact.columnHeaders.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.compact.columnHeaders.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: `${CosmosTheme._components.muiDataGrid.compact.columnHeadersTitle.fontSize.$value}px`,
              fontWeight: `${CosmosTheme._components.muiDataGrid.compact.columnHeadersTitle.fontWeight.$value}`,
              lineHeight: `${CosmosTheme._components.muiDataGrid.compact.columnHeadersTitle.lineHeight.$value}px`,
            },

            // Chips compactos para DataGrid compact
            '& .MuiChip-root': {
              height: `${CosmosTheme._components.muiDataGrid.compact._components.chip.height.$value}px`, 
              fontSize: CosmosTheme.typography.caption.fontSize.$value,
              '& .MuiChip-label': {
                //padding: `0 ${theme.spacing(1)}`,
                paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.chip.py.$value}px`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.chip.px.$value}px`,
                lineHeight: '18px',
              },
              '& .MuiChip-deleteIcon': { //Pendiente
                fontSize: '12px',
                margin: `0 ${theme.spacing(0.25)} 0 ${theme.spacing(-0.5)}`,
              },
              '& .MuiChip-icon': { //Penndiente
                fontSize: '12px',
                marginLeft: theme.spacing(0.5),
              },
            },

            // Avatars
            '& .MuiAvatar-root': {
              width: `${CosmosTheme._components.muiDataGrid.compact._components.avatar.width.$value}px`,
              height: `${CosmosTheme._components.muiDataGrid.compact._components.avatar.height.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.avatar.fontSize.$value}px`,
            },

            // Icons
            '& .MuiSvgIcon-root': {
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.iconButton.root.$value}px`,
            },

            // Icon Buttons
            '& .MuiIconButton-root': {
              padding: theme.spacing(0.25), //Pendiente por validar
              '& .MuiSvgIcon-root': {
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.iconButton.root.$value}px`,
              },
            },


            // Checkboxes
            '& .MuiCheckbox-root': {
              padding: `${CosmosTheme._components.muiDataGrid.compact._components.checkbox.padding.$value}px`,
              '& .MuiSvgIcon-root': {
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.checkbox.root.$value}px`,
              },
            },

            '& .MuiDataGrid-checkboxInput': {
              '& .MuiSvgIcon-root': {
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.checkbox.root.$value}px`,
              },
            },

            // Radio Buttons
            '& .MuiRadio-root': {
              padding: `${CosmosTheme._components.muiDataGrid.compact._components.radioButton.padding.$value}px`,
              '& .MuiSvgIcon-root': {
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.radioButton.root.$value}px`,
              },
            },

            // Switches
            '& .MuiSwitch-root': {
              transform: 'scale(0.85)',
              margin: `${CosmosTheme._components.muiDataGrid.compact._components.switch.margin.$value}px`,
            },

            // Buttons
            '& .MuiButton-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.button.root.py.$value}px`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.button.root.px.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.button.root.fontSize.$value}px`,
              minHeight: `${CosmosTheme._components.muiDataGrid.compact._components.button.root.minHeight.$value}px`,
              lineHeight: `${CosmosTheme._components.muiDataGrid.compact._components.button.root.lineHeight.$value}`,
            },

            // Select inputs - Pendiente de validar
            '& .MuiSelect-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.select.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.select.px.$value}px !important`,
              minHeight: `${CosmosTheme._components.muiDataGrid.compact._components.select.minHeight.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.select.fontSize.$value}px`,
            },

            // Input fields
            '& .MuiInputBase-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.compact._components.input.minHeight.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.input.fontSize.$value}px`,
              '& .MuiInputBase-input': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.input.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.input.px.$value}px !important`,
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.input.fontSize.$value}px`,
              },
            },

            // Badge
            '& .MuiBadge-badge': {
              height: `${CosmosTheme._components.muiDataGrid.compact._components.badge.height.$value}px`,
              minWidth: `${CosmosTheme._components.muiDataGrid.compact._components.badge.minWidth.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.badge.fontSize.$value}px !important`,
              paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.badge.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.badge.px.$value}px !important`,
              lineHeight: `${CosmosTheme._components.muiDataGrid.compact._components.badge.lineHeight.$value}px`,
              top: `${CosmosTheme._components.muiDataGrid.compact._components.badge.marginTop.$value}px`,
              right: `${CosmosTheme._components.muiDataGrid.compact._components.badge.marginRight.$value}px`,
            },

            // CircularProgress
            '& .MuiCircularProgress-root': {
              width: `${CosmosTheme._components.muiDataGrid.compact._components.circularProgress.width.$value}px !important`,
              height: `${CosmosTheme._components.muiDataGrid.compact._components.circularProgress.height.$value}px !important`,
            },
            '& .MuiCircularProgress-root ~ .MuiBox-root .MuiTypography-caption': {
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.circularProgress.fontSize.$value}px !important`,
              
              //`${parseFloat(theme.typography.caption.fontSize) * 0.67}rem !important`, //Validar que hace
            },

            // ToggleButton
            '& .MuiToggleButton-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButton.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButton.px.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButton.fontSize.$value}px !important`,
              minHeight: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButton.minHeight.$value}px`,
              '&.MuiToggleButton-sizeSmall': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButton.small.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButton.small.px.$value}px !important`,
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButton.small.fontSize.$value}px !important`,
              },
            },
            '& .MuiToggleButtonGroup-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.compact._components.toggleButtonGroup.minHeight.$value}px !important`,
            },

            // Autocomplete - usar misma config que Select
            '& .MuiAutocomplete-root .MuiInputBase-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.compact._components.autocomplete.minHeight.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.autocomplete.fontSize.$value}px`,
              '& .MuiInputBase-input': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.autocomplete.inputBase.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.autocomplete.inputBase.px.$value}px !important`,
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.autocomplete.inputBase.fontSize.$value}px`,
              },
            },

            // Alert
            '& .MuiAlert-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.alert.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.alert.px.$value}px !important`,
              minHeight: `${CosmosTheme._components.muiDataGrid.compact._components.alert.minHeight.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.alert.fontSize.$value}px`,
              '& .MuiAlert-icon': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.alert.alertIcon.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.alert.alertIcon.px.$value}px !important`,
                marginRight: `${CosmosTheme._components.muiDataGrid.compact._components.alert.alertIcon.marginRight.$value}px`,
                fontSize: `${CosmosTheme._components.muiDataGrid.compact._components.alert.alertIcon.fontSize.$value}px`,
              },
              '& .MuiAlert-message': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.compact._components.alert.alertMessage.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.compact._components.alert.alertMessage.px.$value}px !important`,
              },
            },

            // Skeleton
            '& .MuiSkeleton-root': {
              height: `${CosmosTheme._components.muiDataGrid.compact._components.skeleton.height.$value}px !important`,
              borderRadius: `${CosmosTheme._components.muiDataGrid.compact._components.skeleton.borderRadius.$value}px`,
            },
          },

          // STANDARD MODE - 32px row height
          '&.MuiDataGrid-root--densityStandard': {
            '& .MuiDataGrid-row': {
              minHeight: `${CosmosTheme._components.muiDataGrid.standard.row.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.standard.row.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-cell': {
              minHeight: `${CosmosTheme._components.muiDataGrid.standard.cell.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.standard.cell.maxHeight.$value}px !important`,
              paddingBlock: `${CosmosTheme._components.muiDataGrid.standard.cell.py.$value}px`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.standard.cell.px.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.standard.cell.fontSize.$value}px`,
            },
            '& .MuiDataGrid-columnHeader': {
              minHeight: `${CosmosTheme._components.muiDataGrid.standard.columnHeader.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.standard.columnHeader.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              minHeight: `${CosmosTheme._components.muiDataGrid.standard.columnHeaders.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.standard.columnHeaders.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: `${CosmosTheme._components.muiDataGrid.standard.columnHeadersTitle.fontSize.$value}px`,
              fontWeight: `${CosmosTheme._components.muiDataGrid.standard.columnHeadersTitle.fontWeight.$value} !important`,
              lineHeight: `${CosmosTheme._components.muiDataGrid.standard.columnHeadersTitle.lineHeight.$value}px`,
            },

            '& .MuiCheckbox-root': {
              padding: `${CosmosTheme._components.muiDataGrid.standard._components.checkbox.padding.$value}px`,
            },
            '& .MuiDataGrid-checkboxInput': {
              '& .MuiSvgIcon-root': {
                fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.checkbox.root.$value}px`,
              },
            },
            '& .MuiRadio-root': {
              padding: `${CosmosTheme._components.muiDataGrid.standard._components.radioButton.padding.$value}px`,
            },
            '& .MuiIconButton-root': {
              padding: theme.spacing(0.5), //Pendiente por validar
            },
            '& .MuiChip-root': {
              height: `${CosmosTheme._components.muiDataGrid.standard._components.chip.height.$value}px`,
            },
            '& .MuiAvatar-root': {
              width: `${CosmosTheme._components.muiDataGrid.standard._components.avatar.width.$value}px`,
              height: `${CosmosTheme._components.muiDataGrid.standard._components.avatar.height.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.avatar.fontSize.$value}px`,
            },
            '& .MuiInputBase-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.standard._components.input.minHeight.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.input.fontSize.$value}px !important`,
              '& .MuiInputBase-input': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.input.base.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.input.base.px.$value}px !important`,
              },
            },
            '& .MuiSelect-root': { //Pendiente por que no toma el estilo
              minHeight: `${CosmosTheme._components.muiDataGrid.standard._components.select.minHeight.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.select.fontSize.$value}px !important`,
              paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.select.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.select.px.$value}px !important`,
            },
            '& .MuiAutocomplete-root': {
              '& .MuiInputBase-root': {
                minHeight: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.minHeight.$value}px`,
                paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.py.$value}px`,
                paddingRight: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.paddingRight.$value}px`,
              },
              '& .MuiAutocomplete-input': {
                fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.input.fontSize.$value}px`,
                paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.input.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.input.px.$value}px !important`,
              },
              '& .MuiAutocomplete-endAdornment': {
                top: 'calc(50% - 0px)',
                right: '4px',
                '& .MuiIconButton-root': {
                  padding: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.iconButton.padding.$value}px`,
                  '& .MuiSvgIcon-root': {
                    fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.autocomplete.iconButton.svgIcon.fontSize.$value}px`,
                  },
                },
              },
            },
            '& .MuiToggleButton-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButton.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButton.px.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButton.fontSize.$value}px`,
              minHeight: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButton.minHeight.$value}px`,
              '&.MuiToggleButton-sizeSmall': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButton.small.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButton.small.px.$value}px !important`,
                fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButton.small.fontSize.$value}px`,
              },
            },
            '& .MuiToggleButtonGroup-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.standard._components.toggleButtonGroup.minHeight.$value}px`,
            },
            '& .MuiBadge-badge': {
              height: `${CosmosTheme._components.muiDataGrid.standard._components.badge.height.$value}px`,
              minWidth: `${CosmosTheme._components.muiDataGrid.standard._components.badge.minWidth.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.badge.fontSize.$value}px`,
              paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.badge.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.badge.px.$value}px !important`,
              top: `${CosmosTheme._components.muiDataGrid.standard._components.badge.marginTop.$value}px`,
              right: `${CosmosTheme._components.muiDataGrid.standard._components.badge.marginRight.$value}px`,
            },
            '& .MuiAlert-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.alert.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.alert.px.$value}px !important`,
              minHeight: `${CosmosTheme._components.muiDataGrid.standard._components.alert.minHeight.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.alert.fontSize.$value}px`,
              '& .MuiAlert-icon': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.alert.alertIcon.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.alert.alertIcon.px.$value}px !important`,
                marginRight: `${CosmosTheme._components.muiDataGrid.standard._components.alert.alertIcon.marginRight.$value}px`,
                fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.alert.alertIcon.fontSize.$value}px`,
              },
              '& .MuiAlert-message': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.standard._components.alert.alertMessage.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.standard._components.alert.alertMessage.px.$value}px !important`,
              },
            },
            '& .MuiCircularProgress-root': {
              width: `${CosmosTheme._components.muiDataGrid.standard._components.circularProgress.width.$value}px !important`,
              height: `${CosmosTheme._components.muiDataGrid.standard._components.circularProgress.height.$value}px !important`,
            },
            '& .MuiCircularProgress-root ~ .MuiBox-root .MuiTypography-caption': {
              fontSize: `${CosmosTheme._components.muiDataGrid.standard._components.circularProgress.fontSize.$value}px !important`,
            },
            '& .MuiSkeleton-root': {
              height: `${CosmosTheme._components.muiDataGrid.standard._components.skeleton.height.$value}px`,
              borderRadius: `${CosmosTheme._components.muiDataGrid.standard._components.skeleton.borderRadius.$value}px`,
            },
          },

          // COMFORTABLE MODE - 40px row height
          '&.MuiDataGrid-root--densityComfortable': {
            '& .MuiDataGrid-row': {
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable.row.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.comfortable.row.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-cell': {
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable.cell.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.comfortable.cell.maxHeight.$value}px !important`,
              paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable.cell.py.$value}px`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable.cell.px.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable.cell.fontSize.$value}px`,
            },
            '& .MuiDataGrid-columnHeader': {
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable.columnHeader.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.comfortable.columnHeader.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable.columnHeaders.minHeight.$value}px !important`,
              maxHeight: `${CosmosTheme._components.muiDataGrid.comfortable.columnHeaders.maxHeight.$value}px !important`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable.columnHeadersTitle.fontSize.$value}px`,
              fontWeight: `${CosmosTheme._components.muiDataGrid.comfortable.columnHeadersTitle.fontWeight.$value}px`,
              lineHeight: `${CosmosTheme._components.muiDataGrid.comfortable.columnHeadersTitle.lineHeight.$value}px`,
            },
            '& .MuiCheckbox-root': {
              padding: `${CosmosTheme._components.muiDataGrid.comfortable._components.checkbox.padding.$value}px`,
            },
            '& .MuiDataGrid-checkboxInput': {
              '& .MuiSvgIcon-root': {
                fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.checkbox.fontSize.$value}px`,
              },
            },
            '& .MuiRadio-root': {
              padding: `${CosmosTheme._components.muiDataGrid.comfortable._components.radioButton.padding.$value}px`,
            },
            '& .MuiIconButton-root': {
              padding: `${CosmosTheme._components.muiDataGrid.comfortable._components.iconButton.padding.$value}px`,
            },
            '& .MuiChip-root': {
              height: `${CosmosTheme._components.muiDataGrid.comfortable._components.chip.height.$value}px !important`,
            },
            '& .MuiAvatar-root': {
              width: `${CosmosTheme._components.muiDataGrid.comfortable._components.avatar.width.$value}px !important`,
              height: `${CosmosTheme._components.muiDataGrid.comfortable._components.avatar.height.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.avatar.fontSize.$value}px !important`,
            },
            '& .MuiInputBase-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable._components.input.minHeight.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.input.fontSize.$value}px`,
              '& .MuiInputBase-input': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.input.base.py.$value}px`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.input.base.px.$value}px`,
              },
            },
            '& .MuiSelect-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable._components.select.minHeight.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.select.fontSize.$value}px`,
              paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.select.py.$value}px`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.select.px.$value}px`,
            },
            '& .MuiAutocomplete-root': {
              '& .MuiInputBase-root': {
                minHeight: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.minHeight.$value}px`,
                paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.py.$value}px !important`,
                paddingRight: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.paddingRight.$value}px !important`,
              },
              '& .MuiAutocomplete-input': {
                fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.input.fontSize.$value}px`,
                paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.input.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.input.px.$value}px !important`,
              },
              '& .MuiAutocomplete-endAdornment': {
                top: 'calc(50% - 2px)',
                right: '4px',
                '& .MuiIconButton-root': {
                  padding: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.iconButton.padding.$value}px`,
                  '& .MuiSvgIcon-root': {
                    fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.autocomplete.iconButton.svgIcon.fontSize.$value}px`,
                  },
                },
              },
            },
            '& .MuiToggleButton-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButton.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButton.px.$value}px !important`,
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButton.fontSize.$value}px`,
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButton.minHeight.$value}px`,
              '&.MuiToggleButton-sizeSmall': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButton.small.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButton.small.px.$value}px !important`,
                fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButton.small.fontSize.$value}px`,
              },
            },
            '& .MuiToggleButtonGroup-root': {
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable._components.toggleButtonGroup.minHeight.$value}px`,
            },
            '& .MuiCircularProgress-root': {
              width: `${CosmosTheme._components.muiDataGrid.comfortable._components.circularProgress.width.$value}px !important`,
              height: `${CosmosTheme._components.muiDataGrid.comfortable._components.circularProgress.height.$value}px !important`,
            },
            '& .MuiCircularProgress-root ~ .MuiBox-root .MuiTypography-caption': {
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.circularProgress.fontSize.$value}px !important`,
            },
            '& .MuiAlert-root': {
              paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.py.$value}px !important`,
              paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.px.$value}px !important`,
              minHeight: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.minHeight.$value}px`,
              fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.fontSize.$value}px`,
              '& .MuiAlert-icon': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.alertIcon.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.alertIcon.px.$value}px !important`,
                marginRight: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.alertIcon.marginRight.$value}px !important`,
                fontSize: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.alertIcon.fontSize.$value}px`,
              },
              '& .MuiAlert-message': {
                paddingBlock: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.alertMessage.py.$value}px !important`,
                paddingInline: `${CosmosTheme._components.muiDataGrid.comfortable._components.alert.alertMessage.px.$value}px !important`,
              },
            },
            '& .MuiSkeleton-root': {
              height: `${CosmosTheme._components.muiDataGrid.comfortable._components.skeleton.height.$value}px`,
              borderRadius: `${CosmosTheme._components.muiDataGrid.comfortable._components.skeleton.borderRadius.$value}px`,
            },
          },
        }),
      },
    },

    // INPUT ADORNMENT - Iconos apropiados para todos los campos
    // - Iconos: 1.15rem para buena visibilidad sin romper el layout
    // - Padding: 0.6 spacing para balance visual
    // - Aplica a DatePickers, TextField, Autocomplete, etc.
    MuiInputAdornment: {
      styleOverrides: {
        root: ({
          '& .MuiIconButton-root': {
            padding: `${CosmosTheme._components.muiIconButton.padding.$value}px !important`,
            '& .MuiSvgIcon-root': {
              fontSize: `${CosmosTheme._components.muiIconButton.fontSize.$value}px !important`,
            },
          },
        }),
      },
    },
  },
};

export default baseThemeConfig;