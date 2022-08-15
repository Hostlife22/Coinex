import { useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Htag, Input, Ptag, UserForm } from '../../components';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

  return (
    <Card className="registration">
      <Htag className="registration__heading" tag="h1">
        Sign Up
      </Htag>
      <Ptag className="registration__description" size="l">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Ptag>
      <UserForm className="registration__form">
        <div className="registration__wrapper">
          <div className="registration__inputs">
            <Input className="registration__input" label="first name" />
            <Input className="registration__input" label="email" />
            <Input className="registration__input" label="password" />
          </div>
          <div className="registration__inputs">
            <Input className="registration__input" label="last name" />
            <Input className="registration__input" label="phone no." />
            <Input className="registration__input" label="confirm password" />
          </div>
        </div>
        <Checkbox
          className='className="registration__checkbox"'
          label="I agree with the terms of use"
          id="remember"
        />
        <Button className="registration__btn" appearance="primary">
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
