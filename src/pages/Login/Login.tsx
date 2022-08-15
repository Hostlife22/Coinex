import { useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Htag, Input, Ptag, UserForm } from '../../components';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Card className="authorization">
      <Htag className="authorization__heading" tag="h1">
        Sign In
      </Htag>
      <Ptag className="authorization__description" size="l">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Ptag>
      <UserForm className="authorization__form">
        <Input className="authorization__input" label="email" />
        <Input className="authorization__input" label="password" />
        <Checkbox className='className="authorization__checkbox"' label="Remember me?" id="remember" />
        <Button className="authorization__btn" appearance="primary">
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
