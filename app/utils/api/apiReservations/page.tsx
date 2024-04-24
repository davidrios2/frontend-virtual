import { RerservaInterface } from "interfaces/reserva.interface"

const BASE_URL = process.env.API_URL

async function saveReservationValues(reservationData: any): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/reservas/crearReserva`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })

    if (!response.ok) {
      throw new Error("Failed to save reservation values")
    }
    return response
  } catch (error) {
    // Handle error here
    console.error("Error saving reservation values:", error)
  }
}

async function getReservationById(id: number): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/reservas/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch passenger by ID")
    }

    const passenger = await response.json()
    return passenger
  } catch (error) {
    // Handle error here
    console.error("Error fetching passenger by ID:", error)
    return null
  }
}

async function getAllReservation(): Promise<RerservaInterface[]> {
  try {
    const response = await fetch(`${BASE_URL}/reservas/all`)

    if (!response.ok) {
      throw new Error("Failed to fetch all passengers")
    }

    const passengers = (await response.json()) as RerservaInterface[]
    return passengers
  } catch (error) {
    console.error("Error fetching all passengers:", error)
    return []
  }
}

export { saveReservationValues, getReservationById, getAllReservation }
