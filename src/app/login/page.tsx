"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: true,
      callbackUrl: '/messages'
    })

    console.log(result)
    // if (res.ok && (res.status !== 500 || 400 )) {
    //     router.push("/home")
    //     router.refresh()
    // }
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/messages');
  };
  
  return (
    <div className='flex flex-col items-center text-center h-screen justify-center'>
      <h1 className=' font-bold text-4xl text-center'>Login</h1>
      <br/>
      <form className='my-5' onSubmit={handleSubmit}>
        <div className='gap-4 label'>
        <span className="label-text">Username</span>
          <input
            type="text"
            id="username"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='text-white py-2 px-5 input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='label gap-4'>
        <span className="label-text">Password</span>
          <input
            type="password"
            id="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='text-white py-2 px-5 input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='flex flex-col my-5 items-center '>
          <Link href={'/signup'} className='hover:underline link link-white'>Don't have an Account? Sign Up!</Link>
          <br/>
          <button type="submit" className='btn btn-wide text-white btn-primary hover:btn-neutral'>Login</button>
          <Link href={'/'} className='hover:underline my-5 btn btn-outline btn-primary btn-wide'>Go Home</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
