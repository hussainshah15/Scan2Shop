import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { CustomerAuthProvider } from './CustomerAuthProvider';
import SignUpScreen from '../Screens/SignUpScreen/SignUpScreen';

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>

  );
}

export default Providers;