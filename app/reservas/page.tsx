"use client"
import React, { useState } from "react"
import { savePassenger } from "app/utils/api/apiPassenger/page"
import { saveReservationValues } from "app/utils/api/apiReservations/page"

function ReservationPage() {
  const [pasajeros, setPasajeros] = useState<
    {
      nombres: string
      apellidos: string
      tipoDocumento: string
      numeroDocumento: string
      tipoPasajero: string
      telefono: string
      correo: string
    }[]
  >([])
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [tipoDocumento, setTipoDocumento] = useState("cedula")
  const [numeroDocumento, setNumeroDocumento] = useState("")
  const [tipoPasajero, setTipoPasajero] = useState("adulto")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [autorizado, setAutorizado] = useState(false)

  const agregarPasajero = () => {
    setPasajeros([
      ...pasajeros,
      {
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        tipoPasajero,
        telefono,
        correo,
      },
    ])
    setNombres("")
    setApellidos("")
    setNumeroDocumento("")
    setTelefono("")
    setCorreo("")
  }

  const borrarTabla = () => {
    setPasajeros([])
  }

  const eliminarPasajero = (index: number) => {
    const nuevosPasajeros = [...pasajeros]
    nuevosPasajeros.splice(index, 1)
    setPasajeros(nuevosPasajeros)
  }

  const guardarReserva = async () => {
    try {
      // Crear la reserva
      const fechaReserva = new Date().toISOString()
      const reservationData = {
        estado: "Pendiente",
        fecha_reserva: fechaReserva,
        vuelo: {
          idVuelo: 2,
        },
      }
      const response = await saveReservationValues(reservationData)

      if (!response.ok) {
        throw new Error("Failed to save reservation")
      }

      const reservaId = (await response.json()).idReserva

      // Guardar cada pasajero con el ID de la reserva
      for (const pasajero of pasajeros) {
        const pasajeroData = {
          nombres: pasajero.nombres,
          apellidos: pasajero.apellidos,
          numeroPasaporte: pasajero.numeroDocumento,
          telefono: pasajero.telefono,
          correo: pasajero.correo,
          idReserva: reservaId,
        }
        await savePassenger(pasajeroData)
      }

      alert("Reserva y pasajeros guardados correctamente.")
    } catch (error) {
      console.error("Error saving reservation:", error)
      alert("Error al guardar la reserva y los pasajeros.")
    }
  }

  const calcularTotal = () => {
    // Aquí calcularías el valor total de los tiquetes y lo mostrarías en la página
    return "$XXX"
  }

  return (
    <div className="bg-blue-100">
      <div className="flex h-12 items-center justify-center bg-blue-500 text-white">Singapur Airlines</div>
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="mb-5 text-xl font-bold">Pasajeros</h1>
        <p className="mb-4">
          Ingresa el nombre, apellido y número de documento de cada pasajero, tal y como aparece en su documento de
          identidad
        </p>
        <div className="mb-4 flex flex-col">
          <label htmlFor="tipo-pasajero" className="mb-2">
            Tipo de Pasajero:
          </label>
          <select
            id="tipo-pasajero"
            value={tipoPasajero}
            onChange={(e) => setTipoPasajero(e.target.value)}
            className="mb-2 rounded border px-2 py-1"
          >
            <option value="adulto">Adulto</option>
            <option value="niño">Niño</option>
          </select>
          <label htmlFor="nombres" className="mb-2">
            Nombres:
          </label>
          <input
            type="text"
            id="nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            className="mb-2 rounded border px-2 py-1"
          />
          <label htmlFor="apellidos" className="mb-2">
            Apellidos:
          </label>
          <input
            type="text"
            id="apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="mb-2 rounded border px-2 py-1"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="tipo-documento" className="mb-2">
            Tipo de Documento:
          </label>
          <select
            id="tipo-documento"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
            className="mb-2 rounded border px-2 py-1"
          >
            <option value="cedula">Cédula</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="tarjeta-identidad">Tarjeta de Identidad</option>
            <option value="cedula-extranjeria">Cédula de Extranjería</option>
          </select>
          <label htmlFor="numero-documento" className="mb-2">
            Número de Documento:
          </label>
          <input
            type="text"
            id="numero-documento"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
            className="mb-2 rounded border px-2 py-1"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="telefono" className="mb-2">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mb-2 rounded border px-2 py-1"
          />
          <label htmlFor="correo" className="mb-2">
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="mb-2 rounded border px-2 py-1"
          />
        </div>
        <div className="mb-4 text-center">
          <button onClick={agregarPasajero} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Agregar Pasajero
          </button>
          <button onClick={borrarTabla} className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Borrar Tabla
          </button>
        </div>
        <div className="mb-4 text-center">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-4">Nombres</th>
                <th className="py-4">Apellidos</th>
                <th className="py-4">Número de Documento</th>
                <th className="py-4">Tipo de Pasajero</th>
                <th className="py-4">Teléfono</th>
                <th className="py-4">Correo</th>
                <th className="py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pasajeros.map((pasajero, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="py-4">{pasajero.nombres}</td>
                  <td className="py-4">{pasajero.apellidos}</td>
                  <td className="py-4">{pasajero.numeroDocumento}</td>
                  <td className="py-4">{pasajero.tipoPasajero}</td>
                  <td className="py-4">{pasajero.telefono}</td>
                  <td className="py-4">{pasajero.correo}</td>
                  <td className="py-4">
                    <button
                      onClick={() => eliminarPasajero(index)}
                      className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4 text-center">
          <label className="flex items-center">
            <input type="checkbox" checked={autorizado} onChange={() => setAutorizado(!autorizado)} className="mr-2" />
            Autorizo el tratamiento de mis datos personales conforme a la política de privacidad
          </label>
        </div>
        <div className="mb-4 text-center">
          <p>
            Valor Total: <span>{calcularTotal()}</span>
          </p>
          <button onClick={guardarReserva} className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            Guardar Reserva
          </button>
        </div>
      </div>
      <div className="flex h-12 items-center justify-center bg-blue-500 text-white">Singapur Airlines</div>
    </div>
  )
}

export default ReservationPage
