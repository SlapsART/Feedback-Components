import { useState } from 'react';
import { Box, Button, FormControlLabel, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography, alpha } from '@mui/material';
import { CosmosAppShell } from '@/widgets/cosmos-app-shell';
import { ObligacionesTable } from '@/widgets/obligaciones-table';
import { AsistenteComposer } from '@/widgets/asistente-composer';
import { FeedbackToast } from '@/shared/ui/feedback-toast';
import type { FeedbackSeverity } from '@/shared/ui/feedback-toast';

const SEVERITIES: { key: FeedbackSeverity; label: string }[] = [
  { key: 'info', label: 'Info' },
  { key: 'warning', label: 'Warning' },
  { key: 'success', label: 'Success' },
  { key: 'error', label: 'Error' },
];

export function FeedbackAsistentePage() {
  const [severity, setSeverity] = useState<FeedbackSeverity>('error');
  const [asistenteOpen, setAsistenteOpen] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [visible, setVisible] = useState(true);

  // While the toast is showing, the assistant collapses out of the way —
  // it returns to whatever the switch says as soon as the toast is dismissed.
  const composerVariant: 'closed' | 'open' = visible ? 'closed' : asistenteOpen ? 'open' : 'closed';

  const relaunch = () => {
    setVisible(true);
    setToastKey((prev) => prev + 1);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" spacing={3} alignItems="center" sx={{ flexShrink: 0, p: 2 }}>
        <Typography variant="subtitle1">Feedback + Asistente</Typography>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={severity}
          onChange={(_, value) => value && setSeverity(value)}
        >
          {SEVERITIES.map(({ key, label }) => (
            <ToggleButton key={key} value={key}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <FormControlLabel
          control={<Switch checked={asistenteOpen} onChange={(_, checked) => setAsistenteOpen(checked)} />}
          label="Asistente abierto"
        />
        <Button variant="outlined" size="small" onClick={relaunch}>
          Disparar feedback
        </Button>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <CosmosAppShell breadcrumbLabel="Obligaciones por pagar">
          <Box sx={{ position: 'relative', flex: 1, minHeight: 0 }}>
            <ObligacionesTable />

            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                px: 2,
                pt: 5,
                pb: 1,
                background: (theme) =>
                  `linear-gradient(to top, ${alpha(theme.palette.background.default, 0.9)} 35%, ${alpha(
                    theme.palette.background.default,
                    0,
                  )} 100%)`,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              <FeedbackToast
                key={toastKey}
                open={visible}
                severity={severity}
                title="Feedback"
                detail="Detalle"
                actionLabel="Acción"
                durationMs={6000}
                onDismiss={() => setVisible(false)}
                enterDistance={64}
                sx={{ width: 435, maxWidth: '90%' }}
              />

              <AsistenteComposer variant={composerVariant} />
            </Box>
          </Box>
        </CosmosAppShell>
      </Box>
    </Box>
  );
}
