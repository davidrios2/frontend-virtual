'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import { redirect } from 'next/navigation';
import { red } from '@mui/material/colors';


export default function ProfileLayout({ children }: { children: React.ReactNode }) {

   const { data: session, status } = useSession();

   useEffect(() => {
      if (status === 'unauthenticated') {
         redirect('/');
      }
   }, [status]);

   if (status === 'loading') {
      return <> </>;
   }

   return (
      <div className="flex justify-center mt-5">
            <div className="px-10 sm:w-[600px]">
               {children}
            </div>
      </div>
   )
}
