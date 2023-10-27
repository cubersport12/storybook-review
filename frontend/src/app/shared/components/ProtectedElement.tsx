import { useAuth } from '@shared/hooks';
import { ReactNode } from 'react';

export const ProtectedElement = ({ children }: { children: ReactNode[] | ReactNode }) => {
  const { model } = useAuth();
  console.info(model);
  if (model?.userName) {
    return <>{children}</>;
  }
  const url = new URL(window.location.href);
  if (!url.href.includes('/login/')) {
    window.location.replace(`${url.origin}/login/`);
  }
  return <>Вы не авторизованы. Идет переадресация на страницу входа...</>;
};
