import React, { useState } from 'react'

const Clientes = ({ clientes }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Teléfono</th>
            <th className="border px-4 py-2">Última Visita</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((cliente) => (
            <tr key={cliente.id}>
              <td className="border px-4 py-2">{cliente.nombre}</td>
              <td className="border px-4 py-2">{cliente.telefono}</td>
              <td className="border px-4 py-2">{cliente.ultimaVisita}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Clientes