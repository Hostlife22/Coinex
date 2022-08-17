import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function ProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  console.log(auth);
  return auth ? <Outlet /> : <Navigate to={'/auth'} state={{ from: location }} />;
}

export default ProtectedRoute;
