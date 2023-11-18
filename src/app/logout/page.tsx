"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // make sure code is running on the client side
    if (typeof window !== 'undefined') {
      // clear user information from local storage
      localStorage.clear();
      // redirect to login
      router.push('/login');
    }
  }, [router]);

  return null;
};

export default Logout;
