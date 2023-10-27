import styled from '@emotion/styled';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppSBar } from '@shared/components';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <Stack>
      <AppSBar />
    </Stack>
  );
}

export default App;
