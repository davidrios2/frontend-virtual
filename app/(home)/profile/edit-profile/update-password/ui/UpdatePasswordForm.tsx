"use client"

import { Grid } from "@mui/material"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
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

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState<"success" | "info" | "error">("info")

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setAlertOpen(false)
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

        if (response && response.userPassword) {
          setAlertMessage("Contraseña actualizada con éxito, regresando a tu perfil...")
          setAlertSeverity("success")
        } else {
          setAlertMessage("Ocurrió un error al cambiar la contraseña")
          setAlertSeverity("error")
        }
      } catch (error) {
        console.error("Error updating password", error)
        setAlertMessage("Ocurrió un error al cambiar la contraseña")
        setAlertSeverity("error")
      }

      setAlertOpen(true)
      setPasswordUpdated(true)
    }
  }

  useEffect(() => {
    if (alertOpen) {
      const timer = setTimeout(() => {
        setAlertOpen(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [alertOpen])

  useEffect(() => {
    if (passwordUpdated && alertSeverity === "success") {
      const timer = setTimeout(() => {
        router.push("/profile")
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [passwordUpdated, alertSeverity, router])

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
          disabled={alertOpen}
          onClick={handleSubmit(onSubmit)}
          className="my-3 flex h-10 w-full items-center justify-center rounded bg-blue-500 text-center text-white"
          style={{ marginTop: "5%", marginBottom: "5%" }}
        >
          Cambiar contraseña
        </button>
      </form>

      <Stack sx={{ width: "100%" }} spacing={2}>
        {alertOpen && (
          <Alert severity={alertSeverity} onClose={handleAlertClose} variant="filled">
            {alertMessage}
          </Alert>
        )}
      </Stack>
    </>
  )
}
