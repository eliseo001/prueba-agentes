import React, { useState } from 'react';
import TurnoForm from './components/TurnoForm.jsx';
import TurnoCard from './components/TurnoCard.jsx';

const App = () => {
  const [turnos, setTurnos] = useState([]);

  const agregarTurno = (nuevoTurno) => {
    setTurnos([...turnos, nuevoTurno]);
  };

  const eliminarTurno = (id) => {
    const turnosFiltrados = turnos.filter((turno) => turno.id !== id);
    setTurnos(turnosFiltrados);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda de Turnos</h1>
      <TurnoForm onSubmit={agregarTurno} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {turnos.map((turno) => (
          <TurnoCard key={turno.id} turno={turno} onDelete={eliminarTurno} />
        ))}
      </div>
    </div>
  );
};

export default App;