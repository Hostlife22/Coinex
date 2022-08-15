import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

const AuthLayout = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
