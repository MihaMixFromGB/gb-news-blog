import React from 'react';
import { Navigate, Outlet, Routes, Route } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import { Login, NewsList } from './components';

export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: JSX.Element;
}

export function ProtectedRoute({
  isAllowed,
  redirectPath = '/login',
  children,
}: ProtectedRouteProps): JSX.Element {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default function Router(): JSX.Element {
  const { user } = useAuth();
  console.log('user', user);
  return (
    <Routes>
      {/* <Route index element={<Login />} /> */}
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute isAllowed={!!user} />}>
        <Route path="/" element={<NewsList />} />
      </Route>
    </Routes>
  );
}
