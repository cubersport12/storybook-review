import { Box, Stack } from '@mui/material';
import { StoriesTree } from './StoriesTree';
import { Route, Routes } from 'react-router-dom';
import { StoriesContent } from './StoriesContent';

export const RevStoriesPage = () => {
  return (
    <Stack direction="row" height="100%">
      <Box width={400} padding={1}>
        <StoriesTree />
      </Box>
      <Box padding={1} width="100%">
        <Routes>
          <Route path="/:repoId/:branchId" element={<StoriesContent />}></Route>
        </Routes>
      </Box>
    </Stack>
  );
};
