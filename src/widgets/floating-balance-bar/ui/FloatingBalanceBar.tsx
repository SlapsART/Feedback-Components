import { Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import { IconCircleCheck } from '@tabler/icons-react';

interface FloatingBalanceBarProps {
  totalDebito: string;
  totalCredito: string;
  onDescartar?: () => void;
  onEnviar?: () => void;
}

export function FloatingBalanceBar({ totalDebito, totalCredito, onDescartar, onEnviar }: FloatingBalanceBarProps) {
  const theme = useTheme();
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        px: 2.5,
        py: 1.25,
        borderRadius: 2,
        bgcolor: 'success.50',
        width: '100%',
        maxWidth: 700,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <IconCircleCheck size={18} color={theme.palette.success.main} />
        <Typography variant="subtitle2" color="success.dark">
          Balanceado
        </Typography>
      </Stack>

      <Stack direction="row" spacing={4}>
        <Stack>
          <Typography variant="caption" color="text.secondary">
            Total Débito
          </Typography>
          <Typography variant="subtitle2">$ {totalDebito}</Typography>
        </Stack>
        <Stack>
          <Typography variant="caption" color="text.secondary">
            Total Crédito
          </Typography>
          <Typography variant="subtitle2">$ {totalCredito}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={onDescartar}>
          Descartar
        </Button>
        <Button size="small" variant="contained" onClick={onEnviar}>
          Enviar
        </Button>
      </Stack>
    </Paper>
  );
}
