import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { MESSAGES } from '../../common/constants';
import { checkNewRegister } from '../../common/helpers';
import { Button, Card, Checkbox, Htag, Input, Ptag, UserForm } from '../../components';
import { useAuthMutation } from '../../features/auth/authApiSlice';
import { setUser } from '../../features/auth/authSlice';
import { usePutStatisticMutation } from '../../features/statistic/statisticApiSlice';
import { initialState as statistics } from '../../features/statistic/statisticSlice';
import { ILoginForm, LocationParams } from './Login.interface';
import './Login.scss';

const Login = () => {
  const [loginUser] = useAuthMutation();
  const [setStatistic] = usePutStatisticMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation() as LocationParams;
  const from = location.state?.from?.pathname || '/';

  const {
    formState: { errors },
    handleSubmit,
    clearErrors,
    register,
    reset,
  } = useForm<ILoginForm>();

  const loginUserHandler = useCallback(async (user: ILoginForm) => {
    await loginUser(user)
      .unwrap()
      .then(({ message, ...user }) => {
        const newUserId = checkNewRegister();
        dispatch(setUser(user));
        navigate(from, { replace: true });

        if (newUserId) {
          setStatistic({ userId: user.userId, statistics });
        }
      })
      .catch((err) => {
        toast.error(MESSAGES.signIn.error);
      });
  }, []);

  const onSubmit = async (formData: ILoginForm): Promise<void> => {
    loginUserHandler(formData);
  };

  return (
    <Card className="authorization">
      <Htag className="authorization__heading" tag="h1">
        Sign In
      </Htag>
      <Ptag className="authorization__description" size="l">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Ptag>

      <UserForm className="authorization__form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', {
            required: { value: true, message: MESSAGES.validation.required.email },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: MESSAGES.validation.email,
            },
          })}
          label="email"
          error={errors.email}
          className="authorization__input"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        <Input
          {...register('password', {
            required: { value: true, message: MESSAGES.validation.required.password },
            minLength: {
              value: 8,
              message: MESSAGES.validation.password,
            },
          })}
          autoComplete="on"
          label="password"
          type="password"
          error={errors.password}
          className="authorization__input"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        <Checkbox className='className="authorization__checkbox"' label="Remember me?" id="remember" />
        <Button className="authorization__btn" appearance="primary" onClick={() => clearErrors()}>
          Sign In
        </Button>
      </UserForm>

      <Ptag className="authorization__description" size="l">
        Don’t have an account?{' '}
        <span className="authorization__link" onClick={() => navigate('/register')}>
          Click here to sign up.
        </span>
      </Ptag>
    </Card>
  );
};

export default Login;
