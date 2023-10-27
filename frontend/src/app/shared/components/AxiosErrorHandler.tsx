import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react';

const AxiosErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  axios.interceptors.response.use(
    config => config,
    (error: AxiosError) => {
      enqueueSnackbar((error.response?.data as any)?.message ?? error.message, { variant: 'error' });
      if (error.response) {
        switch (error.response.status) {
          case 403:
            enqueueSnackbar('Доступ к содержимому запрещен', { variant: 'error' });
            break;
          default:
        }
      }
      return Promise.reject(error);
    }
  );

  return <Fragment></Fragment>;
};

export default AxiosErrorHandler;
