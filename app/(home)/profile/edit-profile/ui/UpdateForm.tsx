"use client"

import { Grid, MenuItem, TextField } from "@mui/material"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Stack from "@mui/material/Stack"
import jwt from "jsonwebtoken"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { TelephonePrefixes } from "components/Forms/TelephonePrefixes"
import { getUserById, updateUser } from "database/dbUser"
import { GetUserReponse } from "interfaces"
import { JWTPayload } from "interfaces/jwt.interface"
import { emailValidations } from "utils"

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
  const [formData, setFormData] = useState<FormInputs | null>(null)
  const [initialValues, setInitialValues] = useState<FormInputs>()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertType, setAlertType] = useState<"success" | "info" | "warning" | "error">("info")
  const router = useRouter()

  const handleClickOpen = (data: FormInputs) => {
    setFormData(data)
    setOpen(true)
  }

  useEffect(() => {
    if (alertOpen) {
      const timer = setTimeout(() => {
        setAlertOpen(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [alertOpen])

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
  }, [session, status])

  useEffect(() => {
    if (userData) {
      setInitialValues({
        name: userData.userName,
        lastName: userData.userLastname,
        email: userData.userEmail,
        telephonePrefix: userData.userPhoneNumber.split(" ")[0] ?? "",
        telephoneNumber: userData.userPhoneNumber.split(" ")[1] ?? "",
      })
    }
  }, [userData])

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
      if (formData.email !== (userData?.userEmail ?? "")) {
        signOut()
      }
    }
  }
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>()

  useEffect(() => {
    if (status === "authenticated") {
      const token: string = session.user.token
      const { userId } = jwt.decode(token as string) as JWTPayload
      const fetchUserData = async () => {
        const userData = await getUserById(userId, token)
        setUserData(userData)
        setValue("name", userData.userName)
        setValue("lastName", userData.userLastname)
        setValue("email", userData.userEmail)
        setValue("telephonePrefix", userData.userPhoneNumber.split(" ")[0] ?? "")
        setValue("telephoneNumber", userData.userPhoneNumber.split(" ")[1] ?? "")
      }
      fetchUserData()
    }
  }, [session, setValue, status])

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

      if (userData && JSON.stringify(data) !== JSON.stringify(initialValues)) {
        if (data.email !== userData.userEmail) {
          handleClickOpen(data)
        } else {
          const updatedUser = await updateUser(userId, token, updates)
          console.log(updatedUser)
          setAlertType("success")
          setAlertOpen(true)

          setTimeout(() => {
            router.push("/profile")
          }, 4000)
        }
      } else {
        setAlertType("warning")
        setAlertOpen(true)
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
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                pattern: { value: /^[a-zA-Z\u00C0-\u00FF\s]*$/, message: "El nombre proporcionado no es válido" },
              }}
              render={({ field }) => (
                <TextField
                  label="Nombres"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                pattern: { value: /^[a-zA-Z\u00C0-\u00FF\s]*$/, message: "El apellido proporcionado no es válido" },
              }}
              render={({ field }) => (
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                validate: emailValidations.isEmail,
              }}
              render={({ field }) => (
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={2} md={3} lg={3}>
            <Controller
              name="telephonePrefix"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
              }}
              render={({ field }) => (
                <TextField
                  label="País"
                  select
                  variant="outlined"
                  fullWidth
                  style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  error={!!errors.telephonePrefix}
                  helperText={errors.telephonePrefix?.message}
                  {...field}
                >
                  {TelephonePrefixes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={10} md={9} lg={9}>
            <Controller
              name="telephoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                pattern: { value: /^[0-9]*$/, message: "El número de celular proporcionado no es válido" },
              }}
              render={({ field }) => (
                <TextField
                  label="Número de celular"
                  variant="outlined"
                  fullWidth
                  error={!!errors.telephoneNumber}
                  helperText={errors.telephoneNumber?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
        <button
          type="submit"
          disabled={alertOpen}
          className="my-3 flex h-10 w-full items-center justify-center rounded bg-blue-500 text-center text-white"
          style={{ marginTop: "5%", marginBottom: "0" }}
        >
          Guardar cambios
        </button>
        <Link href="/profile/edit-profile/update-password">
          <button
            disabled={alertOpen}
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
      <Stack sx={{ width: "100%" }} spacing={2}>
        {alertOpen && (
          <Alert variant="filled" severity={alertType} onClose={() => setAlertOpen(false)}>
            {alertType === "success"
              ? "Los cambios se han guardado con éxito, regresando a tu perfil..."
              : "No se han realizado cambios."}
          </Alert>
        )}
      </Stack>
    </>
  )
}
