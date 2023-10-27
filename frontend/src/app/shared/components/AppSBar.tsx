import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@shared/hooks';

export const AppSBar = () => {
  const {
    model: { userName }
  } = useAuth();
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          StorybookRew
        </Typography>
        <Typography variant="h6">{userName}</Typography>
      </Toolbar>
    </AppBar>
  );
};
