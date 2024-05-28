'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RoleManagementLayout({ children }: { children: React.ReactNode }) {

    const { status } = useSession();

    useEffect(() => {
        if(status === "unauthenticated"){
            redirect('/')
        }
    }, [status])

    if(status === "loading"){
        return (
            <></>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}