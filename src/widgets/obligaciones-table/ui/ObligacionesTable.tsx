import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import type { ChipProps } from '@mui/material';
import { IconFileText, IconFilter, IconSearch } from '@tabler/icons-react';
import {
  MOCK_OBLIGACIONES,
  OBLIGACIONES_FILTERS,
  OBLIGACIONES_TABS,
  type ObligacionEstado,
} from '../lib/mockObligaciones';

const ESTADO_COLOR: Record<ObligacionEstado, ChipProps['color']> = {
  Pendiente: 'warning',
  Confirmada: 'info',
  Causada: 'default',
  Pagada: 'success',
};

export function ObligacionesTable() {
  const [tab, setTab] = useState(1);
  const [filter, setFilter] = useState('Todos');

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
        {OBLIGACIONES_TABS.map((item, index) => (
          <Tab
            key={item.label}
            value={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                {item.label}
                <Chip label={item.count} size="small" />
              </Box>
            }
          />
        ))}
      </Tabs>

      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, py: 1.25 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {OBLIGACIONES_FILTERS.map((item) => (
            <Chip
              key={item.label}
              label={`${item.label} ${item.count}`}
              size="small"
              color={item.label === filter ? 'primary' : 'default'}
              onClick={() => setFilter(item.label)}
              sx={{ transition: 'background-color 150ms ease, color 150ms ease' }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Buscar"
            sx={{ width: 220 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconSearch size={16} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="outlined" size="small" startIcon={<IconFilter size={16} />}>
            Filtrar
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ flex: 1, minHeight: 0 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Transac.</TableCell>
              <TableCell>Medio</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Tercero</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Radica</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_OBLIGACIONES.map((row, index) => (
              <TableRow key={`${row.id}-${index}`} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.transac}</TableCell>
                <TableCell>{row.medio}</TableCell>
                <TableCell align="right">{row.monto}</TableCell>
                <TableCell>{row.moneda}</TableCell>
                <TableCell>{row.tercero}</TableCell>
                <TableCell>
                  <Chip
                    label={row.estado}
                    size="small"
                    variant="outlined"
                    color={ESTADO_COLOR[row.estado]}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2">{row.radica}</Typography>
                    <IconFileText size={14} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
