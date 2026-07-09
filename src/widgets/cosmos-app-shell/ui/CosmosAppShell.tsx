import type { ReactNode } from 'react';
import { Avatar, Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { IconRefresh, IconReportAnalytics } from '@tabler/icons-react';

interface CosmosAppShellProps {
  breadcrumbLabel: string;
  companyName?: string;
  avatarInitials?: string;
  children: ReactNode;
}

const NAV_RAIL_WIDTH = 48;
const HEADER_HEIGHT = 40;

export function CosmosAppShell({
  breadcrumbLabel,
  companyName = 'Empresa de insumos S.A.S',
  avatarInitials = 'PC',
  children,
}: CosmosAppShellProps) {
  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: 'background.default' }}>
      <Box
        sx={{
          width: NAV_RAIL_WIDTH,
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            height: HEADER_HEIGHT,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
            bgcolor: 'background.default',
            boxShadow: '3px 4px 4px 0px rgba(73,71,71,0.03)',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Link underline="none" color="text.secondary" variant="body2" href="#">
              Inicio
            </Link>
            <Typography variant="body1" sx={{ color: 'action.disabled' }}>
              /
            </Typography>
            <Typography variant="body2" color="text.primary">
              {breadcrumbLabel}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {companyName}
            </Typography>
            <IconButton size="small">
              <IconRefresh size={16} />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
            <IconButton size="small">
              <IconReportAnalytics size={16} />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
            <Avatar sx={{ width: 18, height: 18, fontSize: '0.625rem' }}>{avatarInitials}</Avatar>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, p: 2, display: 'flex', flexDirection: 'column' }}>{children}</Box>
      </Box>
    </Box>
  );
}
