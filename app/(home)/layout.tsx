"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import ButtonSession from "components/ui/ButtonSession"
import Footer from "components/ui/Footer"
import MenuSession from "components/ui/MenuSession"
import Navbar from "components/ui/Navbar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  console.log(session)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar>
        {session?.user.role === "ADMINISTRATOR" && (
          <>
            <Link href="/">Gestión de Roles</Link>
            <Link href="/">Gestión de Vuelos</Link>
          </>
        )}
        <Link href="/">Búsqueda de vuelos</Link>
        <Link href="/">Checking</Link>
        {session?.user == null ? (
          <ButtonSession path="/auth/login" content="Iniciar Sesión" />
        ) : (
          <>
            <Link href="/">Reserva</Link>
            <MenuSession />
          </>
        )}
      </Navbar>
      <main className="grow bg-gray-100">{children}</main>
      <Footer>
        <span>Copyright © Singapur Airlines 2024</span>
      </Footer>
    </div>
  )
}
