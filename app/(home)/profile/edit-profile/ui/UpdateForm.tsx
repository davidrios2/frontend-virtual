"use client"

import { signOut, useSession } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link"
import { Grid, MenuItem, TextField } from "@mui/material"
import { TelephonePrefixes } from "components/Forms/TelephonePrefixes"
import { getUserById, updateUser } from "database/dbUser"
import { emailValidations } from "utils"
import jwt from "jsonwebtoken"
import { GetUserReponse } from "interfaces"
import { JWTPayload } from "interfaces/jwt.interface"
import { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

type FormInputs = {
  name: string
  lastName: string
  email: string
  telephonePrefix: string
  telephoneNumber: string
}

export default function UpdateForm() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<GetUserReponse | null>(null)
  const [emailChanged, setEmailChanged] = useState(false)
  const [formData, setFormData] = useState<FormInputs | null>(null)

  const handleClickOpen = (data: FormInputs) => {
    setFormData(data)
    setOpen(true)
  }

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      const token: string = session.user.token
      const { userId } = jwt.decode(token as string) as JWTPayload
      const fetchUserData = async () => {
        const userData = await getUserById(userId, token)
        setUserData(userData)
      }
      fetchUserData()
    }
  }, [session])

  const handleClose = async (agree: boolean) => {
    setOpen(false)
    if (agree && formData && status === "authenticated") {
      const token: string = session.user.token
      const { userId } = jwt.decode(token as string) as JWTPayload
      const updates: Partial<GetUserReponse> = {
        userName: formData.name,
        userLastname: formData.lastName,
        userEmail: formData.email,
        userPhoneNumber: `${formData.telephonePrefix} ${formData.telephoneNumber}`,
      }
      const updatedUser = await updateUser(userId, token, updates)
      console.log(updatedUser)
      if (formData.email !== session.user.email) {
        signOut()
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: userData
      ? {
          name: userData.userName,
          lastName: userData.userLastname,
          email: userData.userEmail,
          telephonePrefix: userData.userPhoneNumber.split(" ")[0],
          telephoneNumber: userData.userPhoneNumber.split(" ")[1],
        }
      : {},
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (status === "authenticated") {
      const token: string = session.user.token
      const { userId } = jwt.decode(token as string) as JWTPayload
      const updates: Partial<GetUserReponse> = {
        userName: data.name,
        userLastname: data.lastName,
        userEmail: data.email,
        userPhoneNumber: `${data.telephonePrefix} ${data.telephoneNumber}`,
      }

      if (data.email !== session.user.email) {
        handleClickOpen(data)
      } else {
        const updatedUser = await updateUser(userId, token, updates)
        console.log(updatedUser)
      }
    }
  }

  if (status === "loading" || !userData) {
    return <> </>
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container={true} spacing={2} marginTop={"5px"}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Nombres"
              variant="outlined"
              defaultValue={userData?.userName}
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
              label="Apellidos"
              variant="outlined"
              defaultValue={userData?.userLastname}
              fullWidth
              {...register("lastName", {
                required: "Este campo es requerido",
                pattern: { value: /^[a-zA-Z\s]*$/, message: "El apellido proporcionado no es válido" },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              defaultValue={userData?.userEmail}
              fullWidth
              {...register("email", {
                required: "Este campo es requerido",
                validate: emailValidations.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={2} md={3} lg={3}>
            <TextField
              label="País"
              select
              variant="outlined"
              fullWidth
              defaultValue={userData?.userPhoneNumber.split(" ")[0]}
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
              label="Número de celular"
              variant="outlined"
              defaultValue={userData?.userPhoneNumber.split(" ")[1]}
              fullWidth
              {...register("telephoneNumber", {
                required: "Este campo es requerido",
                pattern: { value: /^[0-9]*$/, message: "El número de celular proporcionado no es válido" },
              })}
              error={!!errors.telephoneNumber}
              helperText={errors.telephoneNumber?.message}
            />
          </Grid>
        </Grid>
        <button
          type="submit"
          className="my-3 flex h-10 w-full items-center justify-center rounded bg-blue-500 text-center text-white"
          style={{ marginTop: "5%", marginBottom: "0" }}
        >
          Guardar cambios
        </button>
        <Link href="/profile/edit-profile/update-password">
          <button
            className="mb-3 h-10 w-full items-center justify-center rounded bg-blue-500 text-white"
            style={{ marginTop: "5%" }}
          >
            Cambiar contraseña
          </button>
        </Link>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Cambiar correo electrónico?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si cambias tu correo electrónico, se cerrará tu sesión y deberás iniciar sesión de nuevo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancelar</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
