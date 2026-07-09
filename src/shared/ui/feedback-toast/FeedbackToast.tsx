import { useState } from 'react';
import type { ComponentType } from 'react';
import { Box, Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'motion/react';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
import { BorderProgressRing } from './BorderProgressRing';

export type FeedbackSeverity = 'info' | 'warning' | 'success' | 'error';

export interface FeedbackToastProps {
  open: boolean;
  severity: FeedbackSeverity;
  title?: string;
  detail: string;
  actionLabel?: string;
  onAction?: () => void;
  durationMs?: number;
  /** Timer ran out or the close button was clicked — parent should set `open` to false. */
  onDismiss?: () => void;
  /** The exit animation fully finished and the toast is now unmounted. */
  onExited?: () => void;
  /**
   * How far below its resting spot the toast starts on enter (and returns to on exit), in px.
   * Bump this up when something (e.g. an assistant dock) sits directly below the toast, so it
   * visibly travels up from behind that element instead of just nudging into place.
   */
  enterDistance?: number;
  sx?: SxProps<Theme>;
}

const SEVERITY_ICON: Record<FeedbackSeverity, ComponentType<{ size?: number; color?: string }>> = {
  info: IconInfoCircle,
  warning: IconAlertTriangle,
  success: IconCircleCheck,
  error: IconAlertCircle,
};

const MotionBox = motion.create(Box);

export function FeedbackToast({
  open,
  severity,
  title = 'Feedback',
  detail,
  actionLabel,
  onAction,
  durationMs = 5000,
  onDismiss,
  onExited,
  enterDistance = 14,
  sx,
}: FeedbackToastProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const Icon = SEVERITY_ICON[severity];
  const borderColor = theme.palette[severity][300] ?? theme.palette[severity].main;
  const accentColor = theme.palette[severity].main;

  return (
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <MotionBox
          key={`feedback-toast-${severity}`}
          initial={{ opacity: 0, y: enterDistance }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: enterDistance }}
          transition={{ duration: 0.42, ease: 'easeInOut' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            position: 'relative',
            display: 'inline-flex',
            borderRadius: 999,
            boxShadow:
              '0px 0px 22px 0px rgba(93,109,126,0.22), 0px 4px 10px 0px rgba(93,109,126,0.14), 0px 4px 5px 0px rgba(93,109,126,0.18)',
            ...sx,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
              minHeight: 42,
              borderRadius: 999,
              pl: 2,
              pr: 1.25,
              py: 0.75,
              bgcolor: 'background.paper',
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
              <Icon size={16} color={accentColor} />
              <Stack sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" sx={{ color: accentColor }} noWrap>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {detail}
                </Typography>
              </Stack>
            </Stack>

            {actionLabel && (
              <Button size="small" onClick={onAction} sx={{ color: accentColor, flexShrink: 0 }}>
                {actionLabel}
              </Button>
            )}
          </Paper>

          <BorderProgressRing color={borderColor} durationMs={durationMs} paused={hovered} onComplete={onDismiss} />

          <AnimatePresence>
            {hovered && (
              <motion.div
                key="close-button"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                style={{ position: 'absolute', top: -3, right: -11 }}
              >
                <IconButton
                  size="small"
                  aria-label="Cerrar"
                  onClick={onDismiss}
                  sx={{
                    width: 22,
                    height: 22,
                    bgcolor: 'action.focus',
                    '&:hover': { bgcolor: 'action.focus' },
                  }}
                >
                  <IconX size={14} />
                </IconButton>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
