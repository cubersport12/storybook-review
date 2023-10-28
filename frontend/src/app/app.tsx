import { Box, Stack } from '@mui/material';
import { AppSBar } from '@shared/components';
import { RevStoriesPage } from './shared/rev-stories';

export function App() {
  return (
    <Stack height="100%" overflow="hidden">
      <AppSBar />
      <Box flexGrow={1} overflow="hidden">
        <RevStoriesPage />
      </Box>
    </Stack>
  );
}

export default App;
