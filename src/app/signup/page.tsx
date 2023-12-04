"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {

    e.preventDefault();
    /*
    sign up logic here
    */
    router.push('/login');
  };

  return (
    <div className='flex flex-col items-center text-center h-screen justify-center'>
      <h1 className=' text-4xl text-center font-bold'>Sign Up</h1>
      <br/>
      <form className='my-5' onSubmit={handleSignUp}>
        <div className=' label'>
          <span className="label-text">Username</span>
          <input
            type="text"
            id="username"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='ml-4 text-white py-2 px-5 input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='label'>
          <span className="label-text">Email</span>
          <input
            type="text"
            id="email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='ml-4 text-white py-2 px-5 input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='label'>
          <span className="label-text">Password</span>
          <input
            type="password"
            id="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=' ml-4 text-white py-2 px-5 input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='flex flex-col my-5 items-center '>
          <Link href={'/login'} className='hover:underline link link-white'>Don't have an Account? Sign Up!</Link>
          <br />
          <button type="submit" className='btn btn-wide text-white btn-primary hover:btn-neutral'>Sign Up</button>
          <Link href={'/'} className='hover:underline my-5 btn btn-outline btn-primary btn-wide'>Go Home</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
