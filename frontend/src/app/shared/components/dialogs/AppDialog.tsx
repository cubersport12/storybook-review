import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogProps, Stack, IconButton, Typography } from '@mui/material';
import { ReactElement, ReactNode, useState } from 'react';
import { AppDialogContext, AppDialogContextType } from './context';
import { icons } from '@shared/utils';

interface AppDialogRawProps {
  title: string;
  children?: ReactElement | ReactElement[];
  open?: boolean;
  onClose?: (accept: boolean | null) => void;
  extra?: DialogProps;
  confirm?: () => void;
  confirmDisable?: boolean;
  showActions?: boolean;
  height?: string;
  icon: string;
}

export const AppDialog = (props: AppDialogRawProps) => {
  const handleCancel = () => {
    close(false);
  };
  const [context, setContext] = useState<AppDialogContextType>({
    close: handleCancel,
    handleApply: close1 => {}
  });

  const { onClose, title, children, open, extra } = props;
  const close = (accept: boolean | null) => {
    if (onClose) {
      onClose(accept);
    }
  };

  const handleOk = () => {
    if (props.confirm) {
      props.confirm();
    }
    if (context.handleApply) {
      context.handleApply(() => close(true));
    }
  };
  return (
    <AppDialogContext.Provider value={context}>
      <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', height: props.height } }} maxWidth="xs" open={open ?? false} {...extra}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap={1} alignItems="center">
              {props.icon && <i className={props.icon}></i>}
              {title}
            </Stack>
            <IconButton size="small" onClick={handleCancel}>
              <i className={icons.close}></i>
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        {props.showActions !== false && (
          <DialogActions>
            <Button onClick={handleOk} variant="contained" disabled={props.confirmDisable!}>
              Применить
            </Button>
            <Button autoFocus variant="contained" color="warning" onClick={handleCancel}>
              Отмена
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </AppDialogContext.Provider>
  );
};
