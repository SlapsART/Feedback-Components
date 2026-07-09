import { useState } from 'react';
import { Box, Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ConsolaFeedbackDemo } from '@/widgets/consola-feedback-demo';
import type { FeedbackSeverity } from '@/shared/ui/feedback-toast';

const SEVERITIES: { key: FeedbackSeverity; label: string }[] = [
  { key: 'info', label: 'Info' },
  { key: 'warning', label: 'Warning' },
  { key: 'success', label: 'Success' },
  { key: 'error', label: 'Error' },
];

export function FeedbackFloatingBarPage() {
  const [severity, setSeverity] = useState<FeedbackSeverity>('error');
  const [visible, setVisible] = useState(true);
  const [toastKey, setToastKey] = useState(0);

  const relaunch = () => {
    setVisible(true);
    setToastKey((prev) => prev + 1);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" spacing={3} alignItems="center" sx={{ flexShrink: 0, p: 2 }}>
        <Typography variant="subtitle1">Feedback + Floating bar</Typography>
        <ToggleButtonGroup size="small" exclusive value={severity} onChange={(_, value) => value && setSeverity(value)}>
          {SEVERITIES.map(({ key, label }) => (
            <ToggleButton key={key} value={key}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button variant="outlined" size="small" onClick={relaunch}>
          Disparar feedback
        </Button>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ConsolaFeedbackDemo
          withFloatingBar
          severity={severity}
          toastKey={toastKey}
          visible={visible}
          onCloseToast={() => setVisible(false)}
        />
      </Box>
    </Box>
  );
}
