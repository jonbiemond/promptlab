"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CosmosClient } from '@azure/cosmos';
import bcrypt from 'bcrypt';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const addUserToCosmosDB = async (userData: any) => {
    
    const endpoint = 'YOUR_COSMOS_DB_ENDPOINT';
    const key = 'YOUR_COSMOS_DB_KEY';
    const databaseId = 'your_database_name'; // replace with your database name
    const containerId = 'your_container_name'; // replace with your container name
  
    const client = new CosmosClient({ endpoint, key });
  
    try {
      const database = client.database(databaseId);
      const container = database.container(containerId);
  
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // inserts a user into the database
      const { resource: createdItem } = await container.items.create({
        username: userData.username,
        password: hashedPassword,
      });

      console.log('User added successfully:', createdItem?.id);
    } catch (error) {
      console.error('Error adding user to Cosmos DB:', error);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    
    e.preventDefault();
    
    const newUser = {
      username: email,
      password: password
    };
    addUserToCosmosDB(newUser);

    router.push('/login');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
