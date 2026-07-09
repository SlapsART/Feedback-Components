import { Box, Chip, Divider, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import {
  IconAlertTriangle,
  IconArrowUp,
  IconChevronLeft,
  IconChevronRight,
  IconLayoutDashboard,
  IconLayoutSidebarRight,
  IconMessage,
  IconMinus,
  IconPaperclip,
  IconPlus,
  IconX,
} from '@tabler/icons-react';

interface AsistenteComposerProps {
  variant: 'closed' | 'open';
}

const QUICK_ACTIONS = ['Registrar', 'Gestión en espera', 'Saldos y balances', 'Próximos vencimientos'];

const SWAP_TRANSITION = { duration: 0.16, ease: 'easeOut' as const };

function ClosedBody() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: 3,
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary" noWrap>
        Describe lo que necesitas...
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
        <IconButton size="small">
          <IconPaperclip size={18} />
        </IconButton>
        <IconButton size="small" color="primary">
          <IconArrowUp size={18} />
        </IconButton>
      </Box>
    </Paper>
  );
}

function OpenBody() {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'grey.400',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          px: 1.5,
          py: 1,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <IconChevronLeft size={16} />
          <IconAlertTriangle size={14} color={theme.palette.warning.main} />
          <Typography variant="body2">Revisar extractos devueltos</Typography>
          <Chip label={3} size="small" sx={{ bgcolor: 'grey.300' }} />
          <Typography variant="body2" color="text.secondary">
            &ndash; El más antiguo lleva 3 días sin corregir
          </Typography>
          <IconChevronRight size={16} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" sx={{ cursor: 'pointer' }}>
            Ver todas
          </Typography>
          <IconX size={16} />
        </Stack>
      </Stack>

      <Paper
        elevation={4}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: 'primary.100',
          px: 1.5,
          py: 1,
        }}
      >
        <Stack direction="row" justifyContent="flex-end" spacing={0.5} sx={{ mb: 1 }}>
          <IconButton size="small">
            <IconMessage size={16} />
          </IconButton>
          <IconButton size="small">
            <IconLayoutSidebarRight size={16} />
          </IconButton>
          <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
          <IconButton size="small">
            <IconMinus size={16} />
          </IconButton>
        </Stack>

        <Box
          sx={{
            bgcolor: 'grey.50',
            border: 1,
            borderColor: 'primary.100',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            pl: 1,
            pr: 0.5,
            py: 0.5,
            mb: 1,
          }}
        >
          <IconButton size="small">
            <IconPlus size={14} />
          </IconButton>
          <Typography variant="body2" sx={{ flex: 1 }} noWrap>
            Usuario realiza una petición |
          </Typography>
          <IconButton
            size="small"
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            <IconArrowUp size={18} />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, mb: 1 }}>
          {QUICK_ACTIONS.map((label) => (
            <Chip key={label} label={label} size="small" />
          ))}
          <Chip label="Conciliaciones abiertas" size="small" color="primary" />
          <Chip label="Ver más" size="small" variant="outlined" icon={<IconLayoutDashboard size={14} />} />
        </Stack>

        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', textAlign: 'center' }}>
          El contenido generado por IA puede ser incorrecto.
        </Typography>
      </Paper>
    </Box>
  );
}

export function AsistenteComposer({ variant }: AsistenteComposerProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: 700 }}>
      <AnimatePresence mode="wait" initial={false}>
        {variant === 'open' ? (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={SWAP_TRANSITION}
          >
            <OpenBody />
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={SWAP_TRANSITION}
          >
            <ClosedBody />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
