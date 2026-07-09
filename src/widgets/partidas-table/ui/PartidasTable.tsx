import {
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { IconCheck, IconClock, IconPaperclip, IconX } from '@tabler/icons-react';
import { MOCK_PARTIDAS } from '../lib/mockPartidas';

interface PartidasTableProps {
  borradorId: string;
  onClose?: () => void;
}

export function PartidasTable({ borradorId, onClose }: PartidasTableProps) {
  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1">{borradorId}</Typography>
          <IconClock size={16} />
          <Typography variant="body2" color="text.secondary">
            Manual
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Fecha de registro
          </Typography>
          <Typography variant="body2">15/12/2025</Typography>
          <IconButton size="small" onClick={onClose}>
            <IconX size={16} />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ px: 2, py: 1.5 }}>
        <TextField select size="small" label="Partida *" defaultValue="Causación de gasto" sx={{ minWidth: 180 }}>
          <MenuItem value="Causación de gasto">Causación de gasto</MenuItem>
        </TextField>
        <TextField select size="small" label="Moneda *" defaultValue="COP" sx={{ minWidth: 200 }}>
          <MenuItem value="COP">Peso colombiano - COP</MenuItem>
        </TextField>
        <TextField select size="small" label="Libro *" sx={{ minWidth: 120 }} />
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: 'auto', flexShrink: 0 }}>
          <IconPaperclip size={16} />
          <Typography variant="body2" color="primary">
            Nombre_del_documento.pdf
          </Typography>
        </Stack>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width={32}>No.</TableCell>
            <TableCell>Cuenta contable</TableCell>
            <TableCell>Tercero</TableCell>
            <TableCell>Unidad org.</TableCell>
            <TableCell align="right">Débito</TableCell>
            <TableCell align="right">Crédito</TableCell>
            <TableCell width={32} />
          </TableRow>
        </TableHead>
        <TableBody>
          {MOCK_PARTIDAS.map((row) => (
            <TableRow key={row.no} hover>
              <TableCell>{row.no}</TableCell>
              <TableCell>
                <Typography variant="body2">{row.cuentaCodigo}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {row.cuentaNombre}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.terceroCodigo}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {row.terceroNombre}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {row.unidadOrg}
                </Typography>
              </TableCell>
              <TableCell align="right">{row.debito}</TableCell>
              <TableCell align="right">{row.credito}</TableCell>
              <TableCell>
                <IconClock size={14} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                *Asignar cuenta
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                *Asignar tercero
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                *Asignar unidad
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" color="text.secondary">
                *Débito
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" color="text.secondary">
                *Crédito
              </Typography>
            </TableCell>
            <TableCell>
              <IconCheck size={14} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
