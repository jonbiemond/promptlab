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
    <div className='flex flex-col justify-center items-center '>
      <h1 className=' font-semibold text-2xl my-5'>Welcome!</h1>
      <p>Please select an option:</p>
      <div className='flex gap-5 my-2'>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Home;
