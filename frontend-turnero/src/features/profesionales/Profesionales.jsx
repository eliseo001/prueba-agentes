import React from 'react';
import { HiOutlineUserGroup } from 'lucide-react';

const Profesionales = () => {
  const barberos = [
    { nombre: 'Juan Pérez', servicio: 'Corte de pelo clásico' },
    { nombre: 'María López', servicio: 'Peluquería capilar' },
    { nombre: 'Carlos Ramírez', servicio: 'Despeinado premium' }
  ];

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Nuestros Barberos</h2>
      <ul className="space-y-2">
        {barberos.map((barbero, index) => (
          <li key={index} className="flex items-center space-x-2">
            <HiOutlineUserGroup className="text-xl" />
            <div>
              <p className="font-medium">{barbero.nombre}</p>
              <p className="text-gray-500">{barbero.servicio}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profesionales;