import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogProps, useTheme, Stack, styled, Typography } from '@mui/material';
import { icons } from '@shared/utils';

interface ConfirmationDialogRawProps {
  title: string;
  text: string;
  open?: boolean;
  onClose: (accept: boolean | null) => void;
  otherProps?: DialogProps;
  confirm: () => void;
}

const StyledQuestion = styled('i')(({ theme }) => ({
  fontSize: '48px',
  color: theme.palette.primary.main
}));

export const AppConfirmationDialog = (props: ConfirmationDialogRawProps) => {
  const { onClose, title, text, open, otherProps } = props;
  const close = (accept: boolean | null) => {
    if (onClose) {
      onClose(accept);
    }
  };

  const handleCancel = () => {
    close(false);
  };
  const handleOk = () => {
    if (props.confirm) {
      props.confirm();
      close(true);
    }
  };
  const {
    palette: { primary }
  } = useTheme();
  return (
    <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435, padding: '10px' } }} maxWidth="xs" open={open ?? false} {...otherProps}>
      <DialogTitle color={primary.main} textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
          <StyledQuestion className={icons.question}></StyledQuestion>
          <Typography variant="h6">{props.text}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleOk} variant="contained" sx={{ width: '100px' }}>
          ОК
        </Button>
        <Button autoFocus onClick={handleCancel} variant="contained" color="warning" sx={{ width: '100px' }}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};
