"use client";

import { useState } from 'react';
import ReservationForm from './ReservationForm';
import SearchReserv from './SearchReserv';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState('reservation');

  return (
    <div>
      <h1>Bienvenido a nuestro sitio de reservas de vuelos</h1>
      <div className="flex space-x-4">
        <button onClick={() => setCurrentPage('reservation')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Hacer una Reserva
        </button>
        <button onClick={() => setCurrentPage('search')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Buscar Reservas
        </button>
      </div>
      <div className="mt-4">
        {currentPage === 'reservation' && <ReservationForm />}
        {currentPage === 'search' && <SearchReserv />}
      </div>
    </div>
  );
};

export default HomePage;