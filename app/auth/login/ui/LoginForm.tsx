'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Checkbox, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { emailValidations } from 'utils';
import { LogginInterface } from "interfaces/login.interface";
import PasswordField from "components/ui/PasswordField";

export const LoginForm = () => {

   const router = useRouter()
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const { register, handleSubmit, formState: { errors } } = useForm<LogginInterface>();

   const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
   }

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
   }

   const onSubmit: SubmitHandler<LogginInterface> = async (data) => {
      setError("");
      setIsLoading(true);
      const result = await signIn('credentials', {
         redirect: false,
         email: data.userEmail,
         password: data.userPassword
      });
      if (result?.error) {
         setError("El email o contraseña son incorrectos. Vuelve a ingresar tu información o restablece la contraseña.");
         setIsLoading(false);
      }
      if (result?.ok) {
         router.push('/');
      }
   }

   return (
      <>

         <div className="flex items-center my-5 mt-10">
            <div className="flex-1 border-t-3 border-gray-300"></div>
            <div className="px-2 text-gray-800">OR</div>
            <div className="flex-1 border-t-3 border-gray-300"></div>
         </div>

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-3">

            <Grid container={true} spacing={2}>

               <Grid item xs={12}>
                  <TextField
                     label="Correo electrónico"
                     variant="outlined"
                     fullWidth
                     {...register('userEmail', {
                        required: 'Este campo es requerido',
                        validate: emailValidations.isEmail,
                     })}
                     error={!!errors.userEmail}
                     helperText={errors.userEmail?.message}
                  />
               </Grid>

               <Grid item xs={12}>
                  <PasswordField
                     label="Contraseña"
                     register={register("userPassword", {
                        required: "Este campo es requerido",
                     })}
                     errors={errors.userPassword}
                     showPassword={showPassword}
                     handleClickShowPassword={() => handleClickShowPassword()}
                     handleMouseDownPassword={handleMouseDownPassword}
                  />
               </Grid>

               <Grid item xs={12} className="flex items-center" >
                  <Checkbox required />
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                     He leído y acepto los Términos y Condiciones del Programa Singapur Airlines.
                  </Typography>
               </Grid>

               <Grid item xs={12} className="flex items-center" >
                  <Checkbox required />
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                     Autorizo que mis datos sean tratados de acuerdo a la Política de Privacidad.
                  </Typography>
               </Grid>

            </Grid>

            <button className="bg-blue-500 text-center rounded h-10 mb-3 mt-3 flex items-center justify-center text-white">
               {
                  isLoading ? <CircularProgress size={20} color="inherit" /> : 'Iniciar sesión'
               }
            </button>

            {error && <div className="text-red-500 text-left mb-3">{error}</div>}

            <Link href="/auth/new-account" className='underline text-center mb-5 mt-3'>
               No tienes cuenta? Crear nueva cuenta
            </Link>

         </form>

      </>

   )
}

