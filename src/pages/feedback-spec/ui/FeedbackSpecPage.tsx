import { useState } from 'react';
import { Box, Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FeedbackToast } from '@/shared/ui/feedback-toast';
import type { FeedbackSeverity } from '@/shared/ui/feedback-toast';

const SEVERITIES: { key: FeedbackSeverity; label: string }[] = [
  { key: 'info', label: 'Info' },
  { key: 'warning', label: 'Warning' },
  { key: 'success', label: 'Success' },
  { key: 'error', label: 'Error' },
];

const DURATION_OPTIONS = [3000, 5000, 8000];

interface ToastSlotState {
  visible: boolean;
  instanceKey: number;
}

const INITIAL_SLOTS: Record<FeedbackSeverity, ToastSlotState> = {
  info: { visible: false, instanceKey: 0 },
  warning: { visible: false, instanceKey: 0 },
  success: { visible: false, instanceKey: 0 },
  error: { visible: false, instanceKey: 0 },
};

export function FeedbackSpecPage() {
  const [duration, setDuration] = useState(5000);
  const [slots, setSlots] = useState(INITIAL_SLOTS);

  const trigger = (severity: FeedbackSeverity) => {
    setSlots((prev) => ({
      ...prev,
      [severity]: { visible: true, instanceKey: prev[severity].instanceKey + 1 },
    }));
  };

  const dismiss = (severity: FeedbackSeverity) => {
    setSlots((prev) => ({ ...prev, [severity]: { ...prev[severity], visible: false } }));
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Feedback — hoja de especificación
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Dispara cada severidad para ver el estado Default, cómo el borde se va vaciando
        (Timing) y el botón de cierre al pasar el mouse (Hover).
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Duración:
        </Typography>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={duration}
          onChange={(_, value) => value && setDuration(value)}
        >
          {DURATION_OPTIONS.map((option) => (
            <ToggleButton key={option} value={option}>
              {option / 1000}s
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(280px, 1fr))',
          gap: 3,
        }}
      >
        {SEVERITIES.map(({ key, label }) => (
          <Stack key={key} spacing={1.5}>
            <Typography variant="subtitle1">{label}</Typography>
            <Button variant="outlined" size="small" onClick={() => trigger(key)} sx={{ alignSelf: 'flex-start' }}>
              Disparar
            </Button>
            <Box sx={{ minHeight: 44, display: 'flex', alignItems: 'flex-start' }}>
              <FeedbackToast
                key={slots[key].instanceKey}
                open={slots[key].visible}
                severity={key}
                title="Feedback"
                detail="Detalle"
                actionLabel="Acción"
                durationMs={duration}
                onDismiss={() => dismiss(key)}
                sx={{ width: '100%' }}
              />
            </Box>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
