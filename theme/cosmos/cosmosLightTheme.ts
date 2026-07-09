 import { ThemeOptions } from '@mui/material/styles';
 import CosmosTheme from '../ThemeCOSMOS.json';



/**
 * TEMA COSMOS LIGHT - CONFIGURACIONES ESPECÍFICAS DE LA MARCA COSMOS
 *
 * Este archivo contiene únicamente las configuraciones específicas de la marca Cosmos:
 * - Paleta de colores primarios (violeta)
 * - Tipografía (IBM Plex Sans)
 * - Configuraciones de iconos (Tabler Icons)
 */

export const cosmosLightTheme: ThemeOptions & { aiGradient?: string, aiGradientBorder?: string, aiBackgorundCard?: string, aiBackgorundBorder?: string } = {
  // ============================================================================
  // PALETA DE COLORES COSMOS
  // ============================================================================
  palette: {
    // COLORES PRIMARIOS - Violeta/Morado Cosmos
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
      main: CosmosTheme['brand-colors'].indigo[500].$value,
      light: CosmosTheme['brand-colors'].indigo[400].$value,
      dark: CosmosTheme['brand-colors'].indigo[900].$value,
      contrastText: CosmosTheme.palette.primary.contrastText.$value.Light,
    },
  },

  // DEGRADADO PARA SISTEMA DE IA
  
  aiGradient: `linear-gradient(90deg, var(--indigo-500, #2F43D0) 0%, var(--indigo-300, #6676EA) 48%, var(--divider, rgba(16, 24, 64, 0.20)) 100%)`,
  aiGradientBorder: `linear-gradient(90deg, var(--indigo-500, #2F43D0) 0%, var(--indigo-400, #495BDC) 48%, var(--nova-600, #119081) 100%)`,

  // DEGRADADO PARA SISTEMA DE IA - TARJETAS
  aiBackgorundCard: `linear-gradient(270deg, rgba(255, 255, 255, 0.00) 75%, var(--indigo-50, rgba(225, 230, 255, 0.50)) 100%), #FFFFFF`,
  aiBackgorundBorder: `linear-gradient(90deg, var(--indigo-500, rgba(47, 67, 208, 0.70)) 0%, var(--indigo-300, rgba(102, 118, 234, 0.70)) 48%, var(--divider, rgba(16, 24, 64, 0.14)) 100%)`,

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

export default cosmosLightTheme;