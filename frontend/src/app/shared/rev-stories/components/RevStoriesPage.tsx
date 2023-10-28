import { Box, Stack } from '@mui/material';
import { StoriesTree } from './StoriesTree';

export const RevStoriesPage = () => {
  return (
    <Stack direction="row" height="100%">
      <Box width={400} padding={1}>
        <StoriesTree />
      </Box>
    </Stack>
  );
};
