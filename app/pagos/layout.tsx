"use client"

import MenuSession from "components/ui/MenuSession"
import ButtonSession from "components/ui/ButtonSession"
import Navbar from "components/ui/Navbar"
import Footer from "components/ui/Footer";
import Link from "next/link";

import { JWTPayload } from "interfaces/jwt.interface";
import { UserRoles } from "interfaces";

import { useSession, signIn } from "next-auth/react"

export default function PagosLayout({ children, }: { children: React.ReactNode }) {

  const { data: session } = useSession();
  let userInformation: JWTPayload | null = null;

  userInformation = {
    userId: '12',
    userName: 'ARTURO F KENNEDY T',
    roleId: 102
  } as JWTPayload;

  if (!session?.user) {

    return (
      <div className="flex flex-col min-h-screen">
        <Navbar>
          {(userInformation?.roleId === UserRoles.ADMINISTRADOR) &&
            (
              <>
                <Link href="/">Gestión de Roles</Link>
                <Link href="/">Gestión de Vuelos</Link>
              </>
            )}
          <Link href="/busqueda">Búsqueda de vuelos</Link>
          <Link href="/">Checking</Link>
          {
            (userInformation === null)
              ? <ButtonSession path="/auth/login" content="Iniciar Sesión" />
              : (
                <>
                  <Link href="/">Reserva</Link>
                  <MenuSession userName={userInformation?.userName || ""} />
                </>
              )
          }
        </Navbar>
        <main className="flex-grow bg-gray-100">
          {children}
        </main>
        <Footer>
          <span>Copyright © Singapur Airlines 2024</span>
        </Footer>
      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}