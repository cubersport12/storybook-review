import { icons } from '@shared/utils';
import { ReactElement } from 'react';
import { Avatar, Box, Stack, SxProps, Typography, useTheme } from '@mui/material';

export const AppCard = ({
  label,
  children,
  description,
  sx
}: {
  sx?: SxProps;
  label?: string;
  description?: string;
  children: ReactElement[] | ReactElement;
}) => {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  return (
    <Stack borderRadius={1} sx={{ height: '100%', border: '1px solid ' + color, ...(sx ?? {}) }}>
      {label && (
        <Box bgcolor={color} color="white" height={32} display="flex" gap={1} alignItems="center" padding={1}>
          <Avatar sx={{ width: 32, height: 32, background: 'transparent', fontSize: 24, color: 'inherit' }}>
            {/*   {icon && <i className={icons[icon]}></i>}*/}
          </Avatar>
          <Typography variant="h6">{label}</Typography>
          {description && (
            <Typography mt={0.7} variant="caption">
              {description}
            </Typography>
          )}
        </Box>
      )}
      <Box padding={1} overflow="auto" flexGrow={1}>
        {children}
      </Box>
    </Stack>
  );
};
