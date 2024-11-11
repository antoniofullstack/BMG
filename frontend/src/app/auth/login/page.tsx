import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100'>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
