import { Box, Stack } from '@mui/material';
import { ConsolaAppShell } from '@/widgets/consola-app-shell';
import { BorradoresSidebar } from '@/widgets/borradores-sidebar';
import { PartidasTable } from '@/widgets/partidas-table';
import { FloatingBalanceBar } from '@/widgets/floating-balance-bar';
import { FeedbackToast } from '@/shared/ui/feedback-toast';
import type { FeedbackSeverity } from '@/shared/ui/feedback-toast';

interface ConsolaFeedbackDemoProps {
  withFloatingBar: boolean;
  severity: FeedbackSeverity;
  toastKey: number;
  visible: boolean;
  onCloseToast: () => void;
}

export function ConsolaFeedbackDemo({
  withFloatingBar,
  severity,
  toastKey,
  visible,
  onCloseToast,
}: ConsolaFeedbackDemoProps) {
  return (
    <ConsolaAppShell title="Consola de Contabilización">
      <Stack direction="row" sx={{ bgcolor: 'background.paper', borderRadius: 1, flex: 1, minHeight: 0 }}>
        <BorradoresSidebar />

        <Box sx={{ flex: 1, minHeight: 0, position: 'relative', p: 2, overflow: 'auto' }}>
          <PartidasTable borradorId="BRD-76367" />

          {withFloatingBar && (
            <Box sx={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 700, px: 2 }}>
              <FloatingBalanceBar totalDebito="1.200.000,00" totalCredito="1.200.000,00" />
            </Box>
          )}

          {/* Centering lives on this plain wrapper, not on the motion-animated toast itself —
              motion writes its own `transform` inline style for the enter/exit animation,
              which would otherwise clobber a `translateX(-50%)` set via sx. */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: withFloatingBar ? 88 : 24,
              width: 435,
              maxWidth: '90%',
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
              onDismiss={onCloseToast}
              sx={{ width: '100%' }}
            />
          </Box>
        </Box>
      </Stack>
    </ConsolaAppShell>
  );
}
