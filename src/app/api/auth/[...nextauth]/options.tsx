import { CosmosClient } from '@azure/cosmos';
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
    
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials) {
                
                // just in case credentials are null
                if (!credentials || !credentials.username || !credentials.password) {
                    return null;
                }

                const endpoint = process.env.COSMOS_DB_ENDPOINT as string;
                const key = process.env.COSMOS_DB_KEY as string;
                const databaseId = 'your_database_name'; // replace with your database name
                const containerId = 'your_container_name'; // replace with your container name
        
                const client = new CosmosClient({ endpoint, key });
        
                try {
                  const database = client.database(databaseId);
                  const container = database.container(containerId);
        
                  const querySpec = {
                    query: 'SELECT * FROM c WHERE c.username = @username',
                    parameters: [{ name: '@username', value: credentials.username }],
                  };
        
                  // query for user(s) from the database
                  const { resources: users } = await container.items.query(querySpec.query).fetchAll();
        
                  // we just want one and only one user is returned
                  if (users.length === 1) {
                    
                    const user = users[0];
        
                    // compare the provided password with the hashed password from the database
                    if(credentials?.password !== null) {
                        
                        const passwordMatches = await bcrypt.compare(credentials.password, user.password);

                        if (passwordMatches) {
                            return { id: user.id, name: user.username };
                          }
                    }
                    return null;
                  }
        
                  return null; // return null for failed authentication
                } catch (error) {
                  console.error('User credentials could not be retrieved:', error);
                  return null;
                }
              },
        })
    ],
}