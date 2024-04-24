"use client"

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/")
    }
  }, [status])

  if (status === "loading") {
    return <> </>
  }

  return (
    <div className="mt-5 flex justify-center">
      <div className="px-10 sm:w-[600px]">{children}</div>
    </div>
  )
}
