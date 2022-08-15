import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

const AuthLayout = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
