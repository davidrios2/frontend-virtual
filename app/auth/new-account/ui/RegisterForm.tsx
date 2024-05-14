'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Checkbox, CircularProgress, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { emailValidations, passwordValidations } from "utils"
import { TelephonePrefixes } from 'components/Forms/TelephonePrefixes';
import { CreateNewUserInterface, UserInterface, UserRoles, identificationTypes } from 'interfaces';
import { createNewUser } from 'database/dbAuth';

export const RegisterForm = () => {

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<UserInterface>()

  const onSubmit: SubmitHandler<UserInterface> = async (data) => {

    setErrorMessage("");
    setIsLoading(true);

    const newUser: CreateNewUserInterface = {
      userId: data.identificationNumber,
      userIdTipe: data.identificationType,
      userName: data.name,
      userLastname: data.lastName,
      userPhoneNumber: `${data.telephonePrefix} ${data.telephoneNumber}`,
      userEmail: data.email,
      userPassword: data.password,
      roleId: UserRoles.USUARIO_REGISTRADO
    }

    try {
      const result = await createNewUser(newUser);
      if (!result) {
        setErrorMessage("Ha ocurrido un error al intentar crear la cuenta. Por favor, inténtalo de nuevo.");
        setIsLoading(false);
      }
      if (result) {
        await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password
        });
        router.push('/');
      }
    } catch (error) {
      setErrorMessage("Ha ocurrido un error al intentar crear la cuenta. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex flex-col">
      <Grid container={true} spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            {...register("name", {
              required: "Este campo es requerido",
              pattern: { value: /^[a-zA-Z\s]*$/, message: "El nombre proporcionado no es válido" },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            {...register("lastName", {
              required: "Este campo es requerido",
              pattern: { value: /^[a-zA-Z\s]*$/, message: "El apellido proporcionado no es válido" },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>

        <Grid item xs={2} md={3} lg={3}>
          <TextField
            label="Tipo"
            select
            variant="outlined"
            fullWidth
            defaultValue="CC"
            {...register("identificationType", {
              required: "Este campo es requerido",
            })}
            error={!!errors.identificationType}
            helperText={errors.identificationType?.message}
          >
            {identificationTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={10} md={9} lg={9}>
          <TextField
            label="Número de identificación"
            variant="outlined"
            fullWidth
            {...register("identificationNumber", {
              required: "Este campo es requerido",
              pattern: { value: /^[0-9]*$/, message: "El número de identificación proporcionado no es válido" },
            })}
            error={!!errors.identificationNumber}
            helperText={errors.identificationNumber?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "Este campo es requerido",
              validate: emailValidations.isEmail,
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            {...register("password", {
              required: "Este campo es requerido",
              validate: passwordValidations.isPassword,
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid item xs={2} md={3} lg={3}>
          <TextField
            label="País"
            select
            variant="outlined"
            fullWidth
            defaultValue="+57"
            style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
            {...register("telephonePrefix", {
              required: "Este campo es requerido",
            })}
            error={!!errors.telephonePrefix}
            helperText={errors.telephonePrefix?.message}

          >
            {TelephonePrefixes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={10} md={9} lg={9}>
          <TextField
            label="Número de teléfono"
            variant="outlined"
            fullWidth
            {...register("telephoneNumber", {
              required: "Este campo es requerido",
              pattern: { value: /^[0-9]*$/, message: "El número de teléfono proporcionado no es válido" },
              minLength: { value: 10, message: "El número de teléfono proporcionado no es válido" },
            })}
            error={!!errors.telephoneNumber}
            helperText={errors.telephoneNumber?.message}
          />
        </Grid>

        <Grid item xs={12} className="flex items-center">
          <Checkbox required />
          <Typography variant="body2" color="textSecondary" className="mb-2">
            He leído y acepto los Términos y Condiciones del Programa Singapur Airlines.
          </Typography>
        </Grid>

        <Grid item xs={12} className="flex items-center">
          <Checkbox required />
          <Typography variant="body2" color="textSecondary" className="mb-2">
            {'Autorizo que mis datos sean tratados de acuerdo a la '}
            <Link href="/auth/privacy-policy" className="underline" style={{textDecorationColor:'blue', color:'blue'}} >
              Política de Privacidad.
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <button className="mb-3 mt-3 flex h-10 items-center justify-center rounded bg-blue-500 text-center text-white">
        {
          isLoading ? <CircularProgress size={20} color="inherit" /> : 'Crear cuenta'
        }
      </button>

      {errorMessage && <div className="text-red-500 text-left mb-3">{errorMessage}</div>}

      <Link href="/auth/login" className="mb-5 mt-3 text-center underline">
        Ya tienes una cuenta? Inicia sesión
      </Link>
    </form>
  )
}
