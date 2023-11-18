"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {

  const router = useRouter();

  const handleLogin = () => {
    // redirect to the login page
    router.push('/login');
  };

  const handleSignup = () => {
    // redirect to the signup page
    router.push('/signup');
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Please select an option:</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Home;
