
import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loggin } from "database/dbAuth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from 'next-auth/providers/auth0';


// const handler = NextAuth({
//    providers: [
//       CredentialsProvider({
//          name: "Credentials",
//          id: "credentials",
//          credentials: {
//             email: {},
//             password: {},
//          },
//          async authorize(credentials) {

//             try {
//                const userToken = await loggin(credentials!.email, credentials!.password);
//                if (!userToken) throw new Error("Invalid credentials");
//                return userToken;
//             } catch (error) {
//                console.error('Error en el proceso de inicio de sesión')
//                console.log(error);
//             }
//          },
//       }),
//       GoogleProvider({
//          clientId: "700882748149-ns4ak05ik6mg1uog4pb6uhhnqb5usa2e.apps.googleusercontent.com", //TODO: change this to .env
//          clientSecret: "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"
//          // clientId: process.env.GOOGLE_CLIENT_ID!,
//          // clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//       }
//       ),
//       FacebookProvider({
//          clientId: process.env.FACEBOOK_ID!,
//          clientSecret: process.env.FACEBOOK_SECRET!,
//       }),

//       Auth0Provider({
//          wellKnown: `https://${process.env.AUTH0_DOMAIN}/`,
//          issuer: process.env.AUTH0_DOMAIN,
//          authorization: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
//          clientId: `${process.env.AUTH0_CLIENT_ID}`,
//          clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
//       }),
//    ],
//    secret: process.env.AUTH0_CLIENT_SECRET,
//    pages: {
//       signIn: "/uth/login",
//       newUser: '/auth/new-account',
//    },

//    session: {
//       strategy: "jwt",
//    },
//    callbacks: {
//       async jwt({ token, user }) {
//          if (user) token.user = user;
//          return token;
//       },
//       async session({ session, token }) {
//          session.user = token.user as any;
//          return session;
//       },
//       async signIn({ user, account, profile, email, credentials }) {

//          console.log('llegó aqui');

//          const isAllowedToSignIn = true
//          if (isAllowedToSignIn) {
//             return true
//          } else {
//             // Return false to display a default error message
//             return false
//             // Or you can return a URL to redirect to:
//             // return '/unauthorized'
//          }
//       }
//       // async signIn({ account, profile }) {
//       //    if (account?.provider === "google") {
//       //      return profile?.email && profile?.email.endsWith("@example.com")
//       //    }
//       //    return true // Do different verification for other providers that don't have `email_verified`
//       //  },
//    }
// },
// )

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

const options = {
   providers: [
      GoogleProvider({
         clientId: "700882748149-ns4ak05ik6mg1uog4pb6uhhnqb5usa2e.apps.googleusercontent.com", //TODO: change this to .env
         clientSecret: "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"
         // clientId: process.env.GOOGLE_CLIENT_ID!,
         // clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
      // Añade más proveedores según sea necesario
   ],
   callbacks: {
      async session(session: { user: { id: any; }; }, user: { id: any; }) {
         // Puedes añadir campos adicionales al objeto de sesión aquí
         session.user.id = user.id;
         return session;
      },
   },
};

const handler = (req: any, res: any) => NextAuth(req, res, options);

export { handler as GET, handler as POST };