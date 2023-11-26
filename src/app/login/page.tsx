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
      callbackUrl: '/'
    })

    // if (res.ok && (res.status !== 500 || 400 )) {
    //     router.push("/home")
    //     router.refresh()
    // }
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/messages');
  };

  return (
    <div className='flex flex-col items-center my-5 text-center'>
      <h1 className=' font-semibold text-2xl'>Login</h1>
      <form className='my-5' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name='pasword'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='text-black py-2 px-5'
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='text-black py-2 px-5'
          />
        </div>
        <div className='flex flex-col my-5 '>
          <Link href={'/signup'} className='hover:underline'>Don't have an Account? Sign Up!</Link>
          <button type="submit">Login</button>
          <Link href={'/'} className='hover:underline my-5'>Go Back</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
