import { Box, Stack } from '@mui/material';
import { AppSBar } from '@shared/components';
import { RevStoriesPage } from './rev-stories';
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route
        path="/:repoId/:branchId"
        element={
          <Stack height="100%" overflow="hidden">
            <AppSBar />
            <Box flexGrow={1} overflow="hidden">
              <RevStoriesPage />
            </Box>
          </Stack>
        }
      ></Route>
    </Routes>
  );
}

export default App;
