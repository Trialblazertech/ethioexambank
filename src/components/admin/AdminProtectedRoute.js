// components/admin/AdminProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtectedRoute;
