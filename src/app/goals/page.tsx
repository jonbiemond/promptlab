"use client";

import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Goals = () => {
  const { data: session, status } = useSession();

  const goals = [
    'Improve code quality through consistent code reviews.',
    'Implement continuous integration and deployment (CI/CD) pipelines.',
    'Enhance system scalability and performance.',
    'Optimize user experience by focusing on frontend performance.',
    'Adopt best practices for security in development and deployment.',
    'Encourage and support learning and growth among team members.',
  ];
  if (session && status === 'authenticated') {
    return (
      <div className=' items-center h-screen justify-center flex flex-col'>
        <h1 className='text-4xl font-bold'>Engineering Goals</h1>
        <br />
        <ul>
          {goals.map((goal, index) => (
            <p key={index}>{index + 1}. {goal}</p>
          ))}
        </ul>
        <br />
        
        <Link href={'/goals/add'} className='btn btn-wide hover:btn-primary btn-primary'>Add Goal</Link>
        <Link href={'/messages'} className='btn btn-wide hover:btn-primary btn-outline btn-primary'>Go Back</Link>
      </div>
    );
  } else {
    redirect('/login')
  }
};

export default Goals;