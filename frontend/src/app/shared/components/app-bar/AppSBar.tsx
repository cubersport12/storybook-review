import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useAuth } from '@shared/hooks';
import AppBarBranchSelector from './AppBarBranchNavigator';

export const AppSBar = () => {
  const {
    model: { userName }
  } = useAuth();
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <AppBarBranchSelector />
        <Typography variant="h6">{userName}</Typography>
      </Toolbar>
    </AppBar>
  );
};
