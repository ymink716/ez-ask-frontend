import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedRoute = () => {
  const isLogin = localStorage.getItem('access_token');
  
  return isLogin ? <Navigate to= '/' /> : <Outlet />;
};

export default AuthenticatedRoute;