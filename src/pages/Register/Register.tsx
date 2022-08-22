import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { MESSAGES } from '../../common/constants';
import { Button, Card, Checkbox, Htag, Input, Ptag, UserForm } from '../../components';
import { setNewUserId } from '../../features/auth/authSlice';
import { useCreateUserMutation } from '../../features/user/userApiSlice';
import { LocationParams } from '../Login/Login.interface';
import { IRegisterForm } from './Register.interface';
import './Register.scss';

const Register = () => {
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation() as LocationParams;

  const {
    formState: { errors },
    handleSubmit,
    clearErrors,
    register,
    watch,
    reset,
  } = useForm<IRegisterForm>();

  const createNewUser = useCallback(async (formData: IRegisterForm) => {
    const { confirmPassword, ...rest } = formData;

    await createUser(rest)
      .unwrap()
      .then((data) => {
        toast.success(MESSAGES.signUp.success);
        dispatch(setNewUserId(data.id));
        reset();
        navigate('/auth');
      })
      .catch((err) => {
        toast.error(MESSAGES.signUp.error);
      });
  }, []);

  const onSubmit = async (formData: IRegisterForm): Promise<void> => {
    createNewUser(formData);
  };

  return (
    <Card className="registration">
      <Htag className="registration__heading" tag="h1">
        Sign Up
      </Htag>
      <Ptag className="registration__description" size="l">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Ptag>
      <UserForm className="registration__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="registration__wrapper">
          <Input
            {...register('firstName', {
              required: { value: true, message: MESSAGES.validation.required.name },
              minLength: {
                value: 2,
                message: MESSAGES.validation.name,
              },
            })}
            className="registration__input"
            label="first name"
            error={errors.firstName}
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
          <Input
            {...register('lastName', {
              required: { value: true, message: MESSAGES.validation.required.name },
              minLength: {
                value: 2,
                message: MESSAGES.validation.name,
              },
            })}
            className="registration__input"
            label="last name"
            error={errors.lastName}
            aria-invalid={errors.lastName ? 'true' : 'false'}
          />

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
            className="registration__input"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <Input
            {...register('phone', {
              required: { value: true, message: MESSAGES.validation.required.email },
              pattern: {
                value:
                  /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm,
                message: MESSAGES.validation.email,
              },
            })}
            label="phone no."
            error={errors.phone}
            className="registration__input"
            aria-invalid={errors.phone ? 'true' : 'false'}
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
            className="registration__input"
            aria-invalid={errors.password ? 'true' : 'false'}
          />

          <Input
            {...register('confirmPassword', {
              required: { value: true, message: MESSAGES.validation.required.password },
              validate: (value) => value === watch('password') || 'The passwords do not match',
            })}
            autoComplete="on"
            label="confirm password"
            type="password"
            error={errors.confirmPassword}
            className="registration__input"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
        </div>
        <Checkbox className="registration__checkbox" label="I agree with the terms" id="remember" />
        <Button className="registration__btn" appearance="primary" onClick={() => clearErrors()}>
          Sign Up
        </Button>
      </UserForm>
      <Ptag className="registration__description" size="l">
        Already have an Account{' '}
        <span className="registration__link" onClick={() => navigate('/auth')}>
          Sign in
        </span>
      </Ptag>
    </Card>
  );
};

export default Register;
