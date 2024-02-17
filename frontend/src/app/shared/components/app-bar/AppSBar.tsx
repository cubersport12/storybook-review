import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useAuth } from '@shared/hooks';
import AppBarBranchSelector from './AppBarBranchNavigator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const AppSBar = () => {
  const {
    model: { userName }
  } = useAuth();
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <AppBarBranchSelector />
        <Stack marginLeft="auto" gap="5px" direction="row" alignItems="center">
          <FontAwesomeIcon icon={faUser} />
          <Typography variant="h6">{userName}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
