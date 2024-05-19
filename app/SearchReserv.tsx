"use client";

import React, { useState } from 'react';

interface Reserva {
  id_Reserva: string;
  EstadoReserva: string;
  FechaReserva: string;
  id_Vuelo: string;
  tipo_Vuelo: string;
  origen: string;
  destino: string;
  fecha_Salida: string;
  fecha_Llegada: string;
  hora_Salida: string;
  hora_Llegada: string;
  numeroPasajeros: number;
}

function SearchReservationPage() {
  const [cedula, setCedula] = useState('');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [mensaje, setMensaje] = useState('');

  const buscarReservas = () => {
    // Aquí agregarías la lógica para buscar las reservas por la cédula del pasajero
    // Por ejemplo, podrías hacer una llamada a una API y luego actualizar el estado `reservas` con los datos recibidos
    // Aquí se muestra un ejemplo de datos ficticios
    const reservasEncontradas = [
      {
        id_Reserva: '123',
        EstadoReserva: 'Confirmada',
        FechaReserva: '2024-05-10',
        id_Vuelo: '456',
        tipo_Vuelo: 'Internacional',
        origen: 'Bogotá',
        destino: 'Nueva York',
        fecha_Salida: '2024-06-01',
        fecha_Llegada: '2024-06-01',
        hora_Salida: '08:00',
        hora_Llegada: '14:00',
        numeroPasajeros: 1,
      },
      // Puedes agregar más reservas ficticias aquí
    ];
    setReservas(reservasEncontradas);
    setMensaje('');
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
      <div className="h-12 bg-blue-500 text-white flex items-center justify-center">
        Singapur Airlines
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full p-4 bg-white shadow-md rounded-md">
          <h1 className="text-xl font-bold mb-4">Buscar Reserva</h1>
          <div className="mb-4">
            <label htmlFor="cedula" className="block mb-2">Cédula del Pasajero:</label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <button
              onClick={buscarReservas}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            >
              Buscar Reserva
            </button>
          </div>
          {mensaje && <div className="text-red-500 mb-4">{mensaje}</div>}
          <div className="overflow-x-auto">
            <table className="w-full mb-4 table-auto">
              <thead>
                <tr>
                  <th className="px-2 py-1">ID Reserva</th>
                  <th className="px-2 py-1">Estado</th>
                  <th className="px-2 py-1">Fecha Reserva</th>
                  <th className="px-2 py-1">ID Vuelo</th>
                  <th className="px-2 py-1">Tipo Vuelo</th>
                  <th className="px-2 py-1">Origen</th>
                  <th className="px-2 py-1">Destino</th>
                  <th className="px-2 py-1">Fecha Salida</th>
                  <th className="px-2 py-1">Fecha Llegada</th>
                  <th className="px-2 py-1">Hora Salida</th>
                  <th className="px-2 py-1">Hora Llegada</th>
                  <th className="px-2 py-1"># Pasajeros</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{reserva.id_Reserva}</td>
                    <td className="border px-2 py-1">{reserva.EstadoReserva}</td>
                    <td className="border px-2 py-1">{reserva.FechaReserva}</td>
                    <td className="border px-2 py-1">{reserva.id_Vuelo}</td>
                    <td className="border px-2 py-1">{reserva.tipo_Vuelo}</td>
                    <td className="border px-2 py-1">{reserva.origen}</td>
                    <td className="border px-2 py-1">{reserva.destino}</td>
                    <td className="border px-2 py-1">{reserva.fecha_Salida}</td>
                    <td className="border px-2 py-1">{reserva.fecha_Llegada}</td>
                    <td className="border px-2 py-1">{reserva.hora_Salida}</td>
                    <td className="border px-2 py-1">{reserva.hora_Llegada}</td>
                    <td className="border px-2 py-1">{reserva.numeroPasajeros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="h-12 bg-blue-500 text-white flex items-center justify-center">
        Singapur Airlines
      </div>
    </div>
  );
}

export default SearchReservationPage;