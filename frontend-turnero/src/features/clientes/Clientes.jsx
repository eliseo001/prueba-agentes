import React, { useState } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([
    { nombre: 'Juan', telefono: '1234567890', ultimaVisita: '2023-04-01' },
    { nombre: 'Pedro', telefono: '0987654321', ultimaVisita: '2023-03-15' },
    // Agrega más clientes aquí
  ]);
  const [busqueda, setBusqueda] = useState('');

  const filtrarClientes = () => {
    return clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Última Visita</th>
          </tr>
        </thead>
        <tbody>
          {filtrarClientes().map((cliente, index) => (
            <tr key={index}>
              <td className="border p-2">{cliente.nombre}</td>
              <td className="border p-2">{cliente.telefono}</td>
              <td className="border p-2">{cliente.ultimaVisita}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;