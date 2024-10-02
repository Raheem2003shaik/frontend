/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateLogin = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); 
  if (!authToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateLogin;
