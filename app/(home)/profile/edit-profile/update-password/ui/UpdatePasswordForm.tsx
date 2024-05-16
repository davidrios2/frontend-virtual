"use client"

import { Grid } from "@mui/material"
import MuiAlert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import jwt from "jsonwebtoken"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { updatePassword } from "database/dbUser"
import { JWTPayload } from "interfaces/jwt.interface"
import { passwordValidations } from "utils"
import PasswordField from "../../../../../../components/ui/PasswordField"

type FormInputs = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>()
  const { data: session, status } = useSession()
  const newPassword = watch("newPassword")
  const currentPassword = watch("currentPassword")
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const router = useRouter()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const handleSnackbarClose = (reason: string) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbarOpen(false)
  }

  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false })

  const handleClickShowPassword = (field: "current" | "new" | "confirm") => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (status === "authenticated") {
      const token: string = session.user.token
      const { userId } = jwt.decode(token as string) as JWTPayload
      try {
        const response = await updatePassword(userId, token, data.currentPassword, data.newPassword)
        console.log(response)
      } catch (error) {
        console.error("Error updating password", error)
      }
    }

    setSnackbarMessage("Contraseña actualizada con éxito, regresando a tu perfil...")
    setSnackbarOpen(true)
    setPasswordUpdated(true)
  }

  useEffect(() => {
    if (passwordUpdated) {
      const timer = setTimeout(() => {
        router.push("/profile")
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [passwordUpdated, router])

  return (
    <>
      <form action="#">
        <Grid container={true} spacing={6}>
          <Grid item xs={12} md={12} lg={12} style={{ marginTop: "5%" }}>
            <PasswordField
              label="Contraseña actual"
              register={register("currentPassword", {
                required: "Este campo es requerido",
                
              })}
              errors={errors.currentPassword}
              showPassword={showPassword.current}
              handleClickShowPassword={() => handleClickShowPassword("current")}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <PasswordField
              label="Nueva contraseña"
              register={register("newPassword", {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (passwordValidations.isPassword(value)) {
                    return "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y su extensión debe ser entre 8 y 25 caracteres."
                  }
                  if (value === currentPassword) {
                    return "La nueva contraseña debe ser diferente de la contraseña actual"
                  }
                  return true
                },
              })}
              errors={errors.newPassword}
              showPassword={showPassword.new}
              handleClickShowPassword={() => handleClickShowPassword("new")}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <PasswordField
              label="Confirmar contraseña"
              register={register("confirmPassword", {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (passwordValidations.isPassword(value)) {
                    return "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y su extensión debe ser entre 8 y 25 caracteres."
                  }
                  if (value !== newPassword) {
                    return "Las contraseñas no coinciden"
                  }
                  if (value === currentPassword) {
                    return "La nueva contraseña debe ser diferente de la contraseña actual"
                  }
                  return true
                },
              })}
              errors={errors.confirmPassword}
              showPassword={showPassword.confirm}
              handleClickShowPassword={() => handleClickShowPassword("confirm")}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          </Grid>
        </Grid>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="my-3 flex h-10 w-full items-center justify-center rounded bg-blue-500 text-center text-white"
          style={{ marginTop: "12%", marginBottom: "10%" }}
        >
          Cambiar contraseña
        </button>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
