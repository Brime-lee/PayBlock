import React from 'react';
import { useAccount } from 'wagmi';

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { isConnected } = useAccount();

  return isConnected ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
