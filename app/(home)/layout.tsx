'use client'

import { useSession } from "next-auth/react";
import MenuSession from "components/ui/MenuSession"
import ButtonSession from "components/ui/ButtonSession"
import Navbar from "components/ui/Navbar"
import Footer from "components/ui/Footer";
import Link from "next/link";

export default function HomeLayout({ children, }: { children: React.ReactNode }) {

    const { data: session } = useSession();
    //console.log(session?.user.role)

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar>
                {(session?.user.role == "ADMINISTRATOR") &&
                    (
                        <>
                            <Link href="/role-management">Gestión de Roles</Link>
                            <Link href="/">Gestión de Vuelos</Link>
                        </>
                    )}
                <Link href="/">Búsqueda de vuelos</Link>
                <Link href="/">Checking</Link>
                {
                    (session?.user == null) ? <ButtonSession path="/auth/login" content="Iniciar Sesión" />
                        : (
                            <>
                                <Link href="/">Reserva</Link>
                                <MenuSession />
                            </>
                        )
                }
            </Navbar>
            <main>
                {children}
            </main>
            <Footer>
                <span>Copyright © Singapur Airlines 2024</span>
            </Footer>
        </div>
    )
}