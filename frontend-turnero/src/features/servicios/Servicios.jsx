import React from "react";

const Servicios = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Servicios</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-100 text-left">Nombre</th>
            <th className="border px-4 py-2 bg-gray-100 text-left">Precio</th>
            <th className="border px-4 py-2 bg-gray-100 text-left">Duración</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de datos */}
        </tbody>
      </table>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Nuevo Servicio
      </button>
    </div>
  );
};

export default Servicios;