"use client"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Grid, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { TelephonePrefixes } from "components/Forms/TelephonePrefixes"

type FormInputs = {
  name: string
  lastName: string
  email: string
  telephonePrefix: string
  telephoneNumber: string
}

const user = {
  name: "Juan",
  lastName: "Pérez",
  identification: "1234567890",
  email: "julian@google.com.co",
  password: "123456",
  telephonePrefix: "+57",
  telephoneNumber: "1234567890",
}

export default function UserData() {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    handleSubmit,
  } = useForm<FormInputs>()

  useSession()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container={true} spacing={2} marginTop={"3px"}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField label="Nombres" fullWidth defaultValue={user.name} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField label="Apellidos" fullWidth defaultValue={user.lastName} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Identificación"
              variant="outlined"
              fullWidth
              defaultValue={user.identification}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              defaultValue={user.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              name="password"
              label="Contraseña actual"
              variant="outlined"
              fullWidth
              defaultValue={user.password}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={2} md={3} lg={3}>
            <TextField
              label="País"
              select
              variant="outlined"
              fullWidth
              defaultValue={user.telephonePrefix}
              style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              InputProps={{ readOnly: true }}
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
              fullWidth
              defaultValue={user.telephoneNumber}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
        <Link href="/profile/edit-profile">
          <button
            className="mb-3 h-10 w-full items-center justify-center rounded bg-blue-500 text-white"
            style={{ marginTop: "5%" }}
          >
            Editar Perfil
          </button>
        </Link>
      </form>
    </>
  )
}
