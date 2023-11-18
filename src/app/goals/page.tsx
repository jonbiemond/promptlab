"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Goals = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    // redirect to login or sign up if not authenticated
    if (!isAuthenticated) {
      router.push('/');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  const goals = [
    'Improve code quality through consistent code reviews.',
    'Implement continuous integration and deployment (CI/CD) pipelines.',
    'Enhance system scalability and performance.',
    'Optimize user experience by focusing on frontend performance.',
    'Adopt best practices for security in development and deployment.',
    'Encourage and support learning and growth among team members.',
  ];

  return (
    <div>
      <h1>Engineering Goals</h1>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;