import { AuthCookie, BearerKey } from '@shared/utils';

export const useAuth = () => {
  const auth = new AuthCookie();
  return {
    model: auth.model,
    setBearer: auth.setBearer
  };
};
