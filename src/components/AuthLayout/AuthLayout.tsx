import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import './AuthLayout.scss';

const AuthLayout = () => {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to={'/'} replace={true} />;
  }
  return (
    <main className="container">
      <Outlet />
      <ToastContainer autoClose={2000} />
    </main>
  );
};

export default AuthLayout;
