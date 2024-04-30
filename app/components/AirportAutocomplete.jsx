import React, { useState } from "react";

function AirportAutocomplete({ value, onChange, airports }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const filteredSuggestions = airports.filter(
      (airport) =>
        airport.nombre.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.id.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    onChange(inputValue);
  };

  const handleSelect = (airportName) => {
    onChange(airportName);
    setSuggestions([]);
  };

  return (
    <div className="border-2 border-gray-400 rounded">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
    
      <ul className="rounded-xl bg-gray-400 absolute">
        {suggestions.map((airport, index) => (
          <li className="p-2 hover:bg-gray-300" key={index} onClick={() => handleSelect(airport.nombre+" - "+airport.id)}>
            {airport.nombre} - {airport.id}
          </li>
        ))}
      </ul>
      </div>
  );
}

export default AirportAutocomplete;