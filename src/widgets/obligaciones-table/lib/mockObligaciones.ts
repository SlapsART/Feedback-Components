export type ObligacionEstado = 'Pendiente' | 'Confirmada' | 'Causada' | 'Pagada';

export interface Obligacion {
  id: string;
  transac: string;
  medio: string;
  monto: string;
  moneda: string;
  tercero: string;
  estado: ObligacionEstado;
  radica: string;
}

export const OBLIGACIONES_TABS = [
  { label: 'Recibidas', count: 20 },
  { label: 'Compras', count: 60 },
  { label: 'Devoluciones', count: 0 },
  { label: 'Anticipos', count: 100 },
  { label: 'Extractos', count: 200 },
];

export const OBLIGACIONES_FILTERS: { label: string; count: number }[] = [
  { label: 'Todos', count: 20 },
  { label: 'Pendiente', count: 102 },
  { label: 'Confirmada', count: 102 },
  { label: 'Causada', count: 0 },
  { label: 'Pagada', count: 55 },
];

export const MOCK_OBLIGACIONES: Obligacion[] = [
  { id: 'OXP-HGDT-...', transac: '27/01/26', medio: 'TC **** **** 4588', monto: '$1.200.000,00', moneda: 'COP', tercero: 'Uber transporte', estado: 'Pendiente', radica: '27/01/26' },
  { id: 'OXP-AUYU-...', transac: '27/01/26', medio: 'TDC **** **** 4756', monto: '$320.800.000,00', moneda: 'USD', tercero: 'Marriot Hotels', estado: 'Pendiente', radica: '27/01/26' },
  { id: 'OXP-BVRT-0917', transac: '27/01/26', medio: 'TC **** **** 0911', monto: '$8.700.000,00', moneda: 'MXN', tercero: 'American Airlines S.A.S.', estado: 'Confirmada', radica: '27/01/26' },
  { id: 'OXP-ZBCO-7263', transac: '27/01/26', medio: 'TDC **** **** 4556', monto: '$980.000,00', moneda: 'USD', tercero: 'Uber transporte', estado: 'Causada', radica: '27/01/26' },
  { id: 'OXP-HGDT-9857', transac: '27/01/26', medio: 'TDC **** **** 1766', monto: '$34.500.000,00', moneda: 'MXN', tercero: 'American Airlines S.A.S.', estado: 'Pagada', radica: '27/01/26' },
  { id: 'OXP-HGDT-...', transac: '27/01/26', medio: 'TC **** **** 0911', monto: '$1.200.000,00', moneda: 'COP', tercero: 'Uber transporte', estado: 'Pendiente', radica: '27/01/26' },
  { id: 'OXP-AUYU-...', transac: '27/01/26', medio: 'TDC **** **** 1766', monto: '$320.800.000,00', moneda: 'USD', tercero: 'Marriot Hotels', estado: 'Pendiente', radica: '27/01/26' },
  { id: 'OXP-BVRT-0917', transac: '27/01/26', medio: 'TC **** **** 0911', monto: '$8.700.000,00', moneda: 'MXN', tercero: 'American Airlines S.A.S.', estado: 'Confirmada', radica: '27/01/26' },
  { id: 'OXP-ZBCO-7263', transac: '27/01/26', medio: 'TDC **** **** 4756', monto: '$980.000,00', moneda: 'USD', tercero: 'Uber transporte', estado: 'Causada', radica: '27/01/26' },
  { id: 'OXP-HGDT-...', transac: '27/01/26', medio: 'TC **** **** 0911', monto: '$34.500.000,00', moneda: 'MXN', tercero: 'American Airlines S.A.S.', estado: 'Pendiente', radica: '27/01/26' },
];
