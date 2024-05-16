"use client"

import { Grid, MenuItem, TextField } from "@mui/material"
import jwt from "jsonwebtoken"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { TelephonePrefixes } from "components/Forms/TelephonePrefixes"
import { getUserById } from "database/dbUser"
import { GetUserReponse } from "interfaces"
import { JWTPayload } from "interfaces/jwt.interface"

export default function UserData() {
  const [userData, setUserData] = useState<GetUserReponse | null>(null)

  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      const token: string = session.user.token
      const { userId } = jwt.decode(token as string) as JWTPayload
      const fetchUserData = async () => {
        const userData = await getUserById(userId, token)
        setUserData(userData)
      }
      fetchUserData()
      console.log(userData?.userPhoneNumber.split(" ")[0])
    }
  }, [session, status, userData?.userPhoneNumber])

  if (status === "loading" || !userData) {
    return <> </>
  }

  return (
    <>
      <Grid container={true} spacing={2} marginTop={"3px"}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Nombres" fullWidth defaultValue={userData?.userName} InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Apellidos"
            fullWidth
            defaultValue={userData?.userLastname}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Identificación"
            variant="outlined"
            fullWidth
            defaultValue={userData?.userId}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            defaultValue={userData?.userEmail}
            InputProps={{ readOnly: true }}
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
            defaultValue={userData?.userPhoneNumber.split(" ")[1]}
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
    </>
  )
}
