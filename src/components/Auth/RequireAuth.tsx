import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@hooks/useReduxT';

export default function RequireAuth() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} replace />
  );
}
