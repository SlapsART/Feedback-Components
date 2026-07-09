export type BorradorEstado = 'Pendiente' | 'Devuelto';

export interface Borrador {
  id: string;
  tercero: string;
  estado: BorradorEstado;
}

export const BORRADORES_FILTERS = [
  { label: 'Todos', count: 45 },
  { label: 'Pendientes', count: 25 },
  { label: 'Devueltos', count: 5 },
  { label: 'Resueltos', count: 15 },
];

export const MOCK_BORRADORES: Borrador[] = [
  { id: 'BRD-76373', tercero: 'Construcciones Almo S.A.', estado: 'Devuelto' },
  { id: 'BRD-72637', tercero: 'Juan camilo Monrroy Fuentes', estado: 'Pendiente' },
  { id: 'BRD-61253', tercero: 'Importaciones y Recaudos el N...', estado: 'Pendiente' },
  { id: 'BRD-3760', tercero: 'Manufactura y Textiles Alqueria...', estado: 'Pendiente' },
  { id: 'BRD-2666', tercero: 'Autopartes Moreno Ltda.', estado: 'Devuelto' },
  { id: 'BRD-10923', tercero: 'Maria Camila Montenegro Nuñez', estado: 'Pendiente' },
  { id: 'BRD-3760', tercero: 'Inmobiliaria el Acordeon S.A.S.', estado: 'Devuelto' },
  { id: 'BRD-10923', tercero: 'Maria Camila Montenegro Nuñez', estado: 'Pendiente' },
  { id: 'BRD-2666', tercero: 'Construcciones Almo S.A.', estado: 'Devuelto' },
];
