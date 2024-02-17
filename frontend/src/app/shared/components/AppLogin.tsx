import { Box, Button, Divider, Stack, Typography, styled, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppInput } from './AppInput';
import { getBaseHref, icons } from '@shared/utils';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@shared/api';
import { useAuth } from '@shared/hooks';

type FormType = {
  username?: string;
  password?: string;
};

const StyledForm = styled('form')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const AppLogin = () => {
  const {
    control,
    getValues,
    formState: { isValid, isDirty }
  } = useForm<FormType>({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  const { setBearer } = useAuth();
  const loginMutation = useMutation({
    mutationFn: (v: FormType) =>
      AuthService.authControllerLogin({
        username: v.username!,
        password: v.password!
      }),
    onSuccess: r => {
      setBearer(r.access_token);
      location.replace(`${new URL(location.origin).href}${getBaseHref()}`);
    }
  });
  const {
    palette: { background, grey }
  } = useTheme();
  const handleLogin = () => {
    loginMutation.mutate({
      username: getValues('username'),
      password: getValues('password')
    });
  };

  return (
    <StyledForm>
      <Stack gap={1} border={1} borderColor={grey[400]} width={300} borderRadius={2} padding={2} bgcolor={background.default}>
        <Typography alignSelf="center" variant="h5">
          Вход в систему
        </Typography>
        <Divider />
        <AppInput label="Логин" controller={{ control, name: 'username', rules: { required: true } }} />
        <AppInput label="Пароль" type="password" controller={{ control, name: 'password', rules: { required: true } }} />
        <Button
          type="submit"
          onClick={handleLogin}
          disabled={!isValid || !isDirty || loginMutation.isPending}
          fullWidth
          variant="contained"
          color="primary"
        >
          <i className={icons.apply}></i>
          Войти
        </Button>
      </Stack>
    </StyledForm>
  );
};
