import { useState } from 'react';
import { Box, Chip, InputAdornment, List, ListItemButton, ListItemText, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { IconFileText, IconSearch } from '@tabler/icons-react';
import { BORRADORES_FILTERS, MOCK_BORRADORES, type BorradorEstado } from '../lib/mockBorradores';

const ESTADO_COLOR: Record<BorradorEstado, ChipProps['color']> = {
  Pendiente: 'info',
  Devuelto: 'warning',
};

export function BorradoresSidebar() {
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState(0);

  return (
    <Box
      sx={{
        width: 340,
        flexShrink: 0,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        sx={{ flexShrink: 0, borderBottom: 1, borderColor: 'divider', px: 1.5 }}
      >
        <Tab label="Borradores" icon={<Chip label={1} size="small" sx={{ ml: 0.5 }} />} iconPosition="end" />
        <Tab label="Enviados" icon={<Chip label={1} size="small" sx={{ ml: 0.5 }} />} iconPosition="end" />
      </Tabs>

      <Box sx={{ flexShrink: 0, p: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar borrador"
          sx={{ mb: 1.5 }}
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
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          {BORRADORES_FILTERS.map((item) => (
            <Chip
              key={item.label}
              label={`${item.label} ${item.count}`}
              size="small"
              color={item.label === filter ? 'primary' : 'default'}
              onClick={() => setFilter(item.label)}
              sx={{ transition: 'background-color 150ms ease, color 150ms ease' }}
            />
          ))}
        </Stack>
      </Box>

      <List disablePadding sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {MOCK_BORRADORES.map((row, index) => (
          <ListItemButton
            key={`${row.id}-${index}`}
            selected={index === selected}
            onClick={() => setSelected(index)}
            sx={{ px: 1.5, py: 1 }}
          >
            <IconFileText size={16} style={{ marginRight: 8, marginTop: 2, flexShrink: 0 }} />
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle2">{row.id}</Typography>
                  <Chip label={row.estado} size="small" color={ESTADO_COLOR[row.estado]} />
                </Stack>
              }
              secondary={row.tercero}
              slotProps={{ secondary: { noWrap: true } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
