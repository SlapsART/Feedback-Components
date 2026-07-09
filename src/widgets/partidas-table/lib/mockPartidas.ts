export interface Partida {
  no: number;
  cuentaCodigo: string;
  cuentaNombre: string;
  terceroCodigo: string;
  terceroNombre: string;
  unidadOrg: string;
  debito: string;
  credito: string;
}

export const MOCK_PARTIDAS: Partida[] = [
  {
    no: 1,
    cuentaCodigo: '12345678',
    cuentaNombre: 'Nombre cuenta auxiliar',
    terceroCodigo: '37485858-9',
    terceroNombre: 'Construcciones Moder...',
    unidadOrg: 'VTA-001 · Departamento de ventas',
    debito: '0,00',
    credito: '1.200.000,00',
  },
  {
    no: 2,
    cuentaCodigo: '11023949',
    cuentaNombre: 'Generación de inmuebles',
    terceroCodigo: '-',
    terceroNombre: '',
    unidadOrg: 'INS-8578 · Departamento de insu...',
    debito: '600.000,00',
    credito: '0,00',
  },
  {
    no: 3,
    cuentaCodigo: '4667733',
    cuentaNombre: 'Costos de producción o de operaci...',
    terceroCodigo: '52556021',
    terceroNombre: 'Juan Camilo Torres Mir...',
    unidadOrg: '-',
    debito: '600.000,00',
    credito: '0,00',
  },
];
