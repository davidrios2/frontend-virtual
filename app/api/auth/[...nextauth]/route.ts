
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loggin } from "database/dbAuth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";


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

            try {
               const userToken = await loggin(credentials!.email, credentials!.password);
               if (!userToken) throw new Error("Invalid credentials");
               return userToken;
            } catch (error) {
               console.error('Error en el proceso de inicio de sesión')
               console.log(error);
            }
         },
      }),
      GoogleProvider({
         clientId: "700882748149-ns4ak05ik6mg1uog4pb6uhhnqb5usa2e.apps.googleusercontent.com", //TODO: change this to .env
         clientSecret: "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"
      }
      ),
      FacebookProvider({
         clientId: process.env.FACEBOOK_ID!,
         clientSecret: process.env.FACEBOOK_SECRET!,
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
