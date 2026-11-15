import React from 'react';

const TurnoCard = ({ nombre, fecha, hora, onEliminar }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm mx-auto">
      <div className="px-4 py-3">
        <h2 className="text-xl font-bold">{nombre}</h2>
        <p className="text-gray-600">{fecha}</p>
        <p className="text-gray-600">{hora}</p>
      </div>
      <button
        onClick={onEliminar}
        className="bg-red-500 text-white px-4 py-2 rounded-b-lg w-full hover:bg-red-600 transition duration-300"
      >
        Eliminar
      </button>
    </div>
  );
};

export default TurnoCard;