'use client'
import { useSession } from "next-auth/react";
import { StickyHeadTable } from './ui/TableRoles';

export default function RoleManagementPage() {
    const { data: session } = useSession();

    return (
        <>
            {(session?.user.role == "ADMINISTRATOR") &&
                <div className='flex justify-center items-center mt-8 mb-12'>
                    <StickyHeadTable />
                </div>}
        </>
    )
}