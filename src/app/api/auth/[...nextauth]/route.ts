import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions  = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    // placeholder: "Username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    // placeholder: "Password"
                }
            },
            async authorize(credentials) {

                const user = { id: "1", name: "Sample", password: "12345" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


