"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {

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
    <div className='flex flex-col items-center my-5 align-middle text-center'>
      <h1 className=' font-semibold text-2xl'>Sign Up</h1>
      <form className='my-5' onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='text-black py-2 px-5'
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='text-black py-2 px-5'
          />
        </div>
        <div className='flex flex-col my-5 '>
          <Link href={'/login'} className='hover:underline'>Already have an Account? Login HERE!</Link>
          <button type="submit">Submit</button>
          <Link href={'/'} className='hover:underline my-5'>Go Back</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
