
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

//TODO: Eliminar
const users = [
   {
      id: "1",
      email: 'example1@google.com.co',
      password: bcrypt.hashSync('123456', 10),
      role: 'ADMINISTRATOR'
   },
   {
      id: "2",
      email: 'example2@google.com.co',
      password: bcrypt.hashSync('123456', 10),
      role: 'REGISTEREDUSER'
   }
]

const handler = NextAuth({
   providers: [
      CredentialsProvider({
         name: "Credentials",
         id: "credentials",
         credentials: {
            email: {},
            password: {},
         },
         async authorize(credentials) {
            const userFound = users.find(
               (user) => user.email === credentials!.email
            );

            if (!userFound) throw new Error("Invalid credentials");

            const passwordMatch = await bcrypt.compare(
               credentials!.password,
               userFound.password
            );

            if (!passwordMatch) throw new Error("Invalid credentials");

            console.log(userFound);

            return userFound;
         },
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }
      ),
      FacebookProvider({
         clientId: process.env.FACEBOOK_ID,
         clientSecret: process.env.FACEBOOK_SECRET,
      })
   ],
   pages: {
      signIn: "/uth/login",
      newUser: '/auth/new-account',
   },
   session: {
      strategy: "jwt",
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) token.user = user;
         return token;
      },
      async session({ session, token }) {
         session.user = token.user as any;
         return session;
      },
      async signIn({ user, account, profile, email, credentials }) {
         const isAllowedToSignIn = true
         if (isAllowedToSignIn) {
            return true
         } else {
            // Return false to display a default error message
            return false
            // Or you can return a URL to redirect to:
            // return '/unauthorized'
         }
      }
      // async signIn({ account, profile }) {
      //    if (account?.provider === "google") {
      //      return profile?.email && profile?.email.endsWith("@example.com")
      //    }
      //    return true // Do different verification for other providers that don't have `email_verified`
      //  },
   }
},
)

export { handler as GET, handler as POST };