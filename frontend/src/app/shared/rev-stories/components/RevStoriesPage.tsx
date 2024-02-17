import { Box, Stack } from '@mui/material';
import { StoriesTree } from './StoriesTree';
import { Route, Routes } from 'react-router-dom';
import { StoriesContent } from './StoriesContent';

export const RevStoriesPage = () => {
  return (
    <Routes>
      <Route path="/:repoId/:branchId" element={<StoriesContent />}></Route>
    </Routes>
  );
};
