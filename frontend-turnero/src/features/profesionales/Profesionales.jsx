import React from 'react';
import { LuBarberShop } from 'lucide-react';

const Profesionales = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold mb-6">Nuestros Barberos</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <li className="bg-white p-4 shadow rounded-lg hover:bg-gray-100">
          <LuBarberShop size={24} className="mb-2" />
          <h3 className="text-xl font-semibold">Juan Pérez</h3>
          <p>Experto en trajes de punta</p>
        </li>
        <li className="bg-white p-4 shadow rounded-lg hover:bg-gray-100">
          <LuBarberShop size={24} className="mb-2" />
          <h3 className="text-xl font-semibold">Pedro Rodríguez</h3>
          <p>Maestro del corte estilo suizo</p>
        </li>
        <li className="bg-white p-4 shadow rounded-lg hover:bg-gray-100">
          <LuBarberShop size={24} className="mb-2" />
          <h3 className="text-xl font-semibold">Luisa Fernández</h3>
          <p>Profesional en recortes modernos</p>
        </li>
      </ul>
    </div>
  );
};

export default Profesionales;