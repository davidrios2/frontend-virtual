"use client"

import { Titles } from "components/ui/Titles"
import { LoginForm } from "./ui/LoginForm"

export default function LoginPage() {
  return (
    <div>
      <Titles
        title="¡Inicio de Sesión!"
        subtitle="Ingresa a tu cuenta de Singapur Airlines para disfrutar de todos nuestros servicios y reservar tus próximos vuelos a cientos de destinos emocionantes."
      />
      <LoginForm />
    </div>
  )
}
