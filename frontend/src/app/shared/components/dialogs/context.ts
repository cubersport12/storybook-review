import { createContext, useContext } from 'react';

export type AppDialogContextType = {
  handleApply: (close: () => void) => void;
  close: () => void;
};
export const AppDialogContext = createContext<AppDialogContextType>({
  handleApply: close => {},
  close: () => {}
});

export const useDialog = (): AppDialogContextType => useContext(AppDialogContext);
