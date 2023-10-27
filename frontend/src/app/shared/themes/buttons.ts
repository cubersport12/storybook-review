import { IconButton, styled } from '@mui/material';

const FilledButtonBase = styled(IconButton)(({ theme }) => ({
  'width': '32px',
  'height': '32px',
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey.A200
  }
}));

export const PrimaryFilledButton = styled(FilledButtonBase)(({ theme }) => ({
  'backgroundColor': theme.palette.primary.main,
  'color': theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  }
}));

export const SecondaryFilledButton = styled(FilledButtonBase)(({ theme }) => ({
  'backgroundColor': theme.palette.secondary.main,
  'color': theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  }
}));

export const DangerFilledButton = styled(FilledButtonBase)(({ theme }) => ({
  'backgroundColor': theme.palette.error.main,
  'color': theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.secondary.main
  }
}));
