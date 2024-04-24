import { PasajeroInterface } from "interfaces/pasajero.interface"

const BASE_URL = process.env.API_URL

async function savePassenger(passengerData: any): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/agregarUsuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passengerData),
    })

    if (!response.ok) {
      throw new Error("Failed to save reservation values")
    }

    console.log("Reservation values saved successfully")
  } catch (error) {
    console.error("Error saving reservation values:", error)
  }
}

async function getPassengerById(id: number): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/${id}`)

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

async function getAllPassengers(): Promise<PasajeroInterface[]> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/all`)

    if (!response.ok) {
      throw new Error("Failed to fetch all passengers")
    }

    const passengers = (await response.json()) as PasajeroInterface[]
    return passengers
  } catch (error) {
    console.error("Error fetching all passengers:", error)
    return []
  }
}

export { savePassenger, getPassengerById, getAllPassengers }
