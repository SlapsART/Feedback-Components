import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { FeedbackSpecPage } from '@/pages/feedback-spec';
import { FeedbackAsistentePage } from '@/pages/feedback-asistente';
import { FeedbackFloatingBarPage } from '@/pages/feedback-floating-bar';
import { FeedbackGenericoPage } from '@/pages/feedback-generico';

const TABS = [
  { label: 'Hoja de especificación', Component: FeedbackSpecPage },
  { label: 'Feedback + Asistente', Component: FeedbackAsistentePage },
  { label: 'Feedback + Floating bar', Component: FeedbackFloatingBarPage },
  { label: 'Feedback (genérico)', Component: FeedbackGenericoPage },
];

export function App() {
  const [tab, setTab] = useState(0);
  const ActivePage = TABS[tab].Component;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        sx={{ flexShrink: 0, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        {TABS.map((item) => (
          <Tab key={item.label} label={item.label} />
        ))}
      </Tabs>
      <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            style={{ height: '100%' }}
          >
            <ActivePage />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
