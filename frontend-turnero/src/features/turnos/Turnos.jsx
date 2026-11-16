import React from 'react';

const Turnos = ({ turnos }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Próximos Turnos</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border px-6 py-4">Fecha</th>
            <th className="border px-6 py-4">Hora</th>
            <th className="border px-6 py-4">Cliente</th>
            <th className="border px-6 py-4">Servicio</th>
            <th className="border px-6 py-4">Profesional</th>
            <th className="border px-6 py-4">Estado</th>
            <th className="border px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno, index) => (
            <tr key={index} className="bg-gray-100 hover:bg-gray-200">
              <td className="border px-6 py-4">{turno.date}</td>
              <td className="border px-6 py-4">{turno.time}</td>
              <td className="border px-6 py-4">{turno.customer}</td>
              <td className="border px-6 py-4">{turno.service}</td>
              <td className="border px-6 py-4">{turno.professional}</td>
              <td className="border px-6 py-4">{turno.status}</td>
              <td className="border px-6 py-4 flex space-x-2">
                <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700" onClick={() => confirmTurn(turno.id)}>Confirmar</button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700" onClick={() => cancelTurn(turno.id)}>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Turnos;