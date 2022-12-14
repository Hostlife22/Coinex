import { FaHome } from 'react-icons/fa';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button/Button';
import './AuthLayout.scss';

const AuthLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth) {
    return <Navigate to={'/'} replace={true} />;
  }
  return (
    <main className="container">
      <Button appearance="primary" className="home-btn" data-testid="go-home" onClick={() => navigate('/')}>
        <FaHome title="Go home" />
      </Button>
      <Outlet />
      <ToastContainer autoClose={2000} data-testid="toast" />
    </main>
  );
};

export default AuthLayout;
