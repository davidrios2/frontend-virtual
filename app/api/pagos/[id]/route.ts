'use client'

import { useParams } from 'next/navigation'

export async function GET() {

  const params = useParams<{ id: string }>()
  const { id } = params

  return Response.json({ status: `Reserva: ${id}` })
}

