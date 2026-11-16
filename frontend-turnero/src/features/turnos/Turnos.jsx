import React from 'react';

const Turnos = ({ turnos }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesional</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {turnos.map((turno, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{turno.fecha}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turno.hora}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turno.cliente}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turno.servicio}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turno.profesional}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turno.estado}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => handleConfirm(turno.id)}>Confirmar</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded ml-2" onClick={() => handleCancel(turno.id)}>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Turnos;