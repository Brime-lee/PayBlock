import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = (props) => {
  const web3 = useSelector((state) => state.web3);

  return web3?.connected ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
