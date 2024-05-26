'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Footer from "components/ui/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

   const { status } = useSession();

   useEffect(() => {
      if (status === 'authenticated') {
         redirect('/');
      }
   }, [status]);

   if (status === 'loading') {
      return <> </>;
   }

   return (
         <div className="flex flex-col min-h-screen justify-between">
            <Box sx={{ width: '100%', backgroundColor: '#2196F3', position: 'relative', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
               <Typography variant="h2" component="div" fontSize={'30px'} sx={{ color: 'white', padding: 1 }}>
                  Singapur Airlines
               </Typography>
            </Box>

            <div className="flex justify-center bg-gray-100 flex-grow">
               <Box sx={{ backgroundColor: 'white', borderRadius: '40px', marginTop: '20px', marginBottom: '20px'}} >
                  <div className="sm:w-[600px] px-10">
                     {children}
                  </div>
               </Box>
            </div>

            <Footer>
               <span>Copyright © Singapur Airlines 2024</span>
            </Footer>
         </div>
   );

}