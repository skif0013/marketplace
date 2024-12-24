import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
   const isLoggedIn = Boolean(localStorage.getItem('login'));
   return isLoggedIn ? children : <Navigate to="/errors" />;
};

export default ProtectedRoute;
