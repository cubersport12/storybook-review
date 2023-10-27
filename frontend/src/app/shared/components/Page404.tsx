import { Box, styled, Typography } from '@mui/material';

const StyledBox = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const Page404 = () => {
  return (
    <StyledBox>
      <Typography variant="h3">Страница не найдена</Typography>
    </StyledBox>
  );
};
