import React from 'react';
import { IconUser } from '@tabler/icons-react';

const Profesionales = () => {
  const barberos = [
    { nombre: 'Juan Pérez', especialidad: 'Barbero de cabellera' },
    { nombre: 'Ana López', especialidad: 'Cortes personalizados' },
    { nombre: 'Carlos Martínez', especialidad: 'Peinados creativos' }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuestros Barberos</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barberos.map((barbero, index) => (
          <li key={index} className="bg-white shadow-lg p-4 rounded-md">
            <div className="flex items-center mb-2">
              <IconUser className="text-xl text-blue-500 mr-2" />
              <span>{barbero.nombre}</span>
            </div>
            <p className="text-gray-700">{barbero.especialidad}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profesionales;