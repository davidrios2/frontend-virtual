'use client'

import { useSession } from "next-auth/react";
import MenuSession from "components/ui/MenuSession"
import ButtonSession from "components/ui/ButtonSession"
import Navbar from "components/ui/Navbar"
import Footer from "components/ui/Footer";
import Link from "next/link";

import jwt from 'jsonwebtoken';
import { JWTPayload } from "interfaces/jwt.interface";
import { UserRoles } from "interfaces";

export default function HomeLayout({ children, }: { children: React.ReactNode }) {

    const { data: session } = useSession();
    let userInformation: JWTPayload | null = null;

    if (session) {
        const token: string = session.user.token;
        userInformation = jwt.decode(token as string) as JWTPayload;
    }

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
                <Link href="/">Búsqueda de vuelos</Link>
                <Link href="/">Checking</Link>
                {
                    (userInformation === null) ? <ButtonSession path="/auth/login" content="Iniciar Sesión" />
                        : (
                            <>
                                <Link href="/">Reserva</Link>
                                <MenuSession userName={userInformation.userName} />
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