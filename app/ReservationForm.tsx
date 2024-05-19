"use client";

import React, { useState } from 'react';

function ReservationPage() {
  const [pasajeros, setPasajeros] = useState<{ nombre: string; apellido: string; tipoDocumento: string; numeroDocumento: string; tipoPasajero: string; }[]>([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('cedula');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [tipoPasajero, setTipoPasajero] = useState('adulto');
  const [autorizado, setAutorizado] = useState(false);

  const agregarPasajero = () => {
    setPasajeros([
      ...pasajeros,
      { nombre, apellido, tipoDocumento, numeroDocumento, tipoPasajero }
    ]);
    setNombre('');
    setApellido('');
    setNumeroDocumento('');
  };

  const calcularTotal = () => {
    // Aquí calcularías el valor total de los tiquetes y lo mostrarías en la página
    return '$XXX';
  };

  return (
    <div className="bg-blue-100">
      <div className="h-12 bg-blue-500 text-white flex items-center justify-center">
        Singapur Airlines
      </div>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Pasajeros</h1>
        <p>Ingresa el nombre, apellido y número de documento de cada pasajero, tal y como aparece en su documento de identidad</p>
        <div className="mb-4">
          <label htmlFor="tipo-pasajero">Tipo de Pasajero:</label>
          <select id="tipo-pasajero" value={tipoPasajero} onChange={(e) => setTipoPasajero(e.target.value)} className="border rounded px-2 py-1">
            <option value="adulto">Adulto</option>
            <option value="niño">Niño</option>
          </select>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="border rounded px-2 py-1" />
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div className="mb-4">
          <label htmlFor="tipo-documento">Tipo de Documento:</label>
          <select id="tipo-documento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} className="border rounded px-2 py-1">
            <option value="cedula">Cédula</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="tarjeta-identidad">Tarjeta de Identidad</option>
            <option value="cedula-extranjeria">Cédula de Extranjería</option>
          </select>
          <label htmlFor="numero-documento">Número de Documento:</label>
          <input type="text" id="numero-documento" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div className="mb-4">
          <button onClick={agregarPasajero} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Agregar Pasajero</button>
        </div>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Número de Documento</th>
              <th>Tipo de Pasajero</th>
              <th>Valor del Tiquete</th>
            </tr>
          </thead>
          <tbody>
            {pasajeros.map((pasajero, index) => (
              <tr key={index}>
                <td>{pasajero.nombre}</td>
                <td>{pasajero.apellido}</td>
                <td>{pasajero.numeroDocumento}</td>
                <td>{pasajero.tipoPasajero}</td>
                <td>$XXX</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-4">
          <label>
            <input type="checkbox" checked={autorizado} onChange={() => setAutorizado(!autorizado)} /> Autorizo el tratamiento de mis datos personales conforme a la política de privacidad
          </label>
        </div>
        <div className="mb-4">
          <p>Valor Total: <span>{calcularTotal()}</span></p>
          <button onClick={() => alert('Pagar')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Pagar</button>
        </div>
      </div>
      <div className="h-12 bg-blue-500 text-white flex items-center justify-center">
        Singapur Airlines
      </div>
    </div>
  );
}

export default ReservationPage;
