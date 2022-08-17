import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './AuthLayout.scss';

const AuthLayout = () => {
  return (
    <main className="container">
      <Outlet />
      <ToastContainer autoClose={2000} />
    </main>
  );
};

export default AuthLayout;
