import React from 'react';
import { HiChartPie, HiDocumentCheck, HiClipboardList, HiXCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="bg-white shadow-md rounded-lg px-4 py-6 flex items-center justify-between">
        <div>
          <HiChartPie className="w-10 h-10 text-blue-500" />
          <h3 className="mt-2">Turnos Hoy</h3>
        </div>
        <span className="text-2xl font-bold">15</span>
      </div>
      <div className="bg-white shadow-md rounded-lg px-4 py-6 flex items-center justify-between">
        <div>
          <HiDocumentCheck className="w-10 h-10 text-green-500" />
          <h3 className="mt-2">Ingresos Estimados</h3>
        </div>
        <span className="text-2xl font-bold">$3,000</span>
      </div>
      <div className="bg-white shadow-md rounded-lg px-4 py-6 flex items-center justify-between">
        <div>
          <HiClipboardList className="w-10 h-10 text-yellow-500" />
          <h3 className="mt-2">Pendientes</h3>
        </div>
        <span className="text-2xl font-bold">5</span>
      </div>
      <div className="bg-white shadow-md rounded-lg px-4 py-6 flex items-center justify-between">
        <div>
          <HiXCircle className="w-10 h-10 text-red-500" />
          <h3 className="mt-2">Cancelados</h3>
        </div>
        <span className="text-2xl font-bold">2</span>
      </div>
    </div>
  );
};

export default Dashboard;