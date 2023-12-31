import { useAuth } from '@shared/hooks';
import { ReactNode } from 'react';
import { getBaseHref } from '@shared/utils';

export const ProtectedElement = ({ children }: { children: ReactNode[] | ReactNode }) => {
  const { model } = useAuth();
  if (model?.userName) {
    return <>{children}</>;
  }
  const url = new URL(window.location.href);
  if (!url.href.includes('/login/')) {
    window.location.replace(`${url.origin}${getBaseHref()}/login/`);
  }
  return <>Вы не авторизованы. Идет переадресация на страницу входа...</>;
};
