import type { ReactNode } from 'react';
import { Avatar, Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import { IconGridDots } from '@tabler/icons-react';
import { IconAsistenteBubble } from '@/shared/ui/icons';

interface ConsolaAppShellProps {
  title: string;
  children: ReactNode;
}

export function ConsolaAppShell({ title, children }: ConsolaAppShellProps) {
  return (
    <Box sx={{ bgcolor: 'background.default', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexShrink: 0, height: 36, px: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconGridDots size={16} />
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
            sinco
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contabilidad
          </Typography>
          <Chip label="Consola de Contabilización" size="small" color="primary" variant="outlined" />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Empresa de insumos S.A.S
          </Typography>
          <Avatar sx={{ width: 22, height: 22, fontSize: '0.625rem' }}>PC</Avatar>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flexShrink: 0, px: 3, py: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton
          size="small"
          aria-label="Asistente"
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'grey.100',
            border: '1px solid rgba(47,67,208,0.08)',
            boxShadow:
              '0px 3px 14px 2px rgba(47,67,208,0.09), 2px 4px 6px 1px rgba(182,192,255,0.14), 2px 4px 4px -3px rgba(182,192,255,0.2)',
            '&:hover': { bgcolor: 'grey.200' },
          }}
        >
          <IconAsistenteBubble size={20} />
        </IconButton>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, px: 3, pb: 3, display: 'flex', flexDirection: 'column' }}>{children}</Box>
    </Box>
  );
}
