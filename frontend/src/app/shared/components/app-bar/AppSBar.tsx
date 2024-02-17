import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@shared/hooks';
import { AppBarBranchSelector } from '../AppBarBranchSelector';

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
