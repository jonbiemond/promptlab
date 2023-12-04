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
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className=' font-semibold text-4xl my-5'>Welcome to PromptLab!</h1>
      <p>Please select an option:</p>
      <br/>
      <div className='flex gap-5 my-2'>
        <button className='btn btn-neutral hover:btn-primary text-white px-10 uppercase hover:text-white' onClick={handleLogin}>Login</button>
        <button className='btn btn-neutral hover:btn-primary text-white px-10 uppercase hover:text-white' onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Home;
