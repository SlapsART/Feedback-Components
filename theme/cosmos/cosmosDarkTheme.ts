import { ThemeOptions } from '@mui/material/styles';
import CosmosTheme from '../ThemeCOSMOS.json';

/**
 * TEMA COSMOS DARK - CONFIGURACIONES ESPECÍFICAS DE LA MARCA COSMOS
 *
 * Este archivo contiene únicamente las configuraciones específicas de la marca Cosmos en modo oscuro:
 * - Paleta de colores primarios (violeta) adaptada para dark mode
 * - Tipografía (IBM Plex Sans)
 * - Configuraciones de iconos (Tabler Icons)
 */

export const cosmosDarkTheme: ThemeOptions = {
  // ============================================================================
  // PALETA DE COLORES COSMOS - MODO OSCURO
  // ============================================================================
  palette: {
    mode: 'dark',
    // COLORES PRIMARIOS - Violeta/Morado Cosmos (adaptado para modo oscuro)
    primary: {
      50: CosmosTheme['brand-colors'].indigo[50].$value,
      100: CosmosTheme['brand-colors'].indigo[100].$value,
      200: CosmosTheme['brand-colors'].indigo[200].$value,
      300: CosmosTheme['brand-colors'].indigo[300].$value,
      400: CosmosTheme['brand-colors'].indigo[400].$value,
      500: CosmosTheme['brand-colors'].indigo[500].$value,
      600: CosmosTheme['brand-colors'].indigo[600].$value,
      700: CosmosTheme['brand-colors'].indigo[700].$value,
      800: CosmosTheme['brand-colors'].indigo[800].$value,
      900: CosmosTheme['brand-colors'].indigo[900].$value,
      main: CosmosTheme['brand-colors'].indigo.A200.$value,  // Más brillante en dark mode
      light: CosmosTheme['brand-colors'].indigo[200].$value,
      dark: CosmosTheme['brand-colors'].indigo[700].$value,
      contrastText: CosmosTheme.palette.primary.contrastText.$value.Dark,
    },
    // Colores de fondo para modo oscuro
    background: {
      default: CosmosTheme.palette.background.default.$value.Dark,
      paper: CosmosTheme.palette.background.paper.$value.Dark,
    },
    // Colores de texto para modo oscuro
    text: {
      primary: CosmosTheme.palette.text.primary.$value.Dark,
      secondary: CosmosTheme.palette.text.secondary.$value.Dark,
      disabled: CosmosTheme.palette.text.disabled.$value.Dark,
    },
    // Líneas divisoras para modo oscuro
    divider: CosmosTheme.palette.divider.$value.Dark,
    // Acciones para modo oscuro
    action: {
      active: CosmosTheme.palette.action.active.$value.Dark,
      hover: CosmosTheme.palette.action.hover.$value.Dark,
      selected: CosmosTheme.palette.action.selected.$value.Dark,
      disabled: CosmosTheme.palette.action.disabled.$value.Dark,
      disabledBackground: CosmosTheme.palette.action.disabledBackground.$value.Dark,
    },
  },

  // ============================================================================
  // TIPOGRAFÍA COSMOS - IBM PLEX SANS
  // ============================================================================
  typography: {
    fontFamily: CosmosTheme.typography.fontFamily.$value,

    // JERARQUÍA DE TÍTULOS - Basada en tokens Cosmos
    h1: {
      fontSize: `${CosmosTheme.typography.heading.h1.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.heading.h1.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.heading.h1.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.heading.h1.letterSpacing.$value}px`,
    },
    h2: {
      fontSize: `${CosmosTheme.typography.heading.h2.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.heading.h2.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.heading.h2.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.heading.h2.letterSpacing.$value}px`,
    },
    h3: {       
      fontSize: `${CosmosTheme.typography.heading.h3.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.heading.h3.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.heading.h3.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.heading.h3.letterSpacing.$value}px`,
    },
    h4: {
      fontSize: `${CosmosTheme.typography.heading.h4.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.heading.h4.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.heading.h4.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.heading.h4.letterSpacing.$value}px`,
    },
    h5: {
      fontSize: `${CosmosTheme.typography.heading.h5.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.heading.h5.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.heading.h5.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.heading.h5.letterSpacing.$value}px`,
    },
    h6: {
      fontSize: `${CosmosTheme.typography.heading.h6.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.heading.h6.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.heading.h6.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.heading.h6.letterSpacing.$value}px`,
    },

    // TEXTO DE CUERPO
    body1: {
      fontSize: `${CosmosTheme.typography.body[1].fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.body[1].fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.body[1].lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.body[1].letterSpacing.$value}px`,
    },
    body2: {
      fontSize: `${CosmosTheme.typography.body[2].fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.body[2].fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.body[2].lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.body[2].letterSpacing.$value}px`,
    },

    // ELEMENTOS ESPECIALES // PENDIENTE POR DEFINIR EN TOKENS
    button: {
      fontSize: '0.8125rem',
      fontWeight: 500,
      lineHeight: '1.25rem',
      textTransform: 'none' as const,
    },
    caption: {
      fontSize: `${CosmosTheme.typography.caption.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.caption.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.caption.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.caption.letterSpacing.$value}px`,
    },
    overline: {
      fontSize: `${CosmosTheme.typography.overline.fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.overline.fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.overline.lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.overline.letterSpacing.$value}px`,
      textTransform: 'uppercase' as const,
    },
    subtitle1: {
      fontSize: `${CosmosTheme.typography.subtitle[1].fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.subtitle[1].fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.subtitle[1].lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.subtitle[1].letterSpacing.$value}px`,
    },
    subtitle2: {
      fontSize: `${CosmosTheme.typography.subtitle[2].fontSize.$value}px`,
      fontWeight: `${CosmosTheme.typography.subtitle[2].fontWeight.$value}`,
      lineHeight: `${CosmosTheme.typography.subtitle[2].lineHeight.$value}px`,
      letterSpacing: `${CosmosTheme.typography.subtitle[2].letterSpacing.$value}px`,
    },
  },  
  // ============================================================================
  // COMPONENTES ESPECÍFICOS COSMOS
  // ============================================================================
  components: {
    // CONFIGURACIÓN DE ICONOS - Tabler Icons para Cosmos
    // Nota: Tabler Icons requiere configuración adicional en el proyecto
    // Los iconos de Tabler se usan típicamente como componentes SVG importados
    // Por ejemplo: import { IconHome } from '@tabler/icons-react';
    MuiSvgIcon: {
      defaultProps: {
        // Tamaño por defecto para iconos SVG
        fontSize: 'medium',
      },
      styleOverrides: {
        root: {
          // Tamaños consistentes con el diseño de Cosmos
          '&.MuiSvgIcon-fontSizeSmall': {
            fontSize: '1.25rem',
          },
          '&.MuiSvgIcon-fontSizeMedium': {
            fontSize: '1.5rem',
          },
          '&.MuiSvgIcon-fontSizeLarge': {
            fontSize: '2rem',
          },
        },
      },
    },
  },
};

export default cosmosDarkTheme;