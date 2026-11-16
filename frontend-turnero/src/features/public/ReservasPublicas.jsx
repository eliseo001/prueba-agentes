```jsx
import React, { useState } from 'react';

const ReservasPublicas = () => {
  const [servicio, setServicio] = useState('');
  const [profesional, setProfesional] = useState('');
  const [horario, setHorario] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const servicios = ['Massaje', 'Corte de Pelo', 'Uñas'];
  const profesionales = ['Juan Perez', 'Maria Lopez'];
  const horarios = ['10:00 AM', '12:00 PM', '2:00 PM'];

  const handleReservar = () => {
    // Aquí iría la lógica para guardar la reserva
    console.log('Servicio:', servicio);
    console.log('Profesional:', profesional);
    console.log('Horario:', horario);
    console.log('Nombre:', nombre);
    console.log('Teléfono:', telefono);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reserva tu cita</h1>
      <select
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      >
        <option disabled value="">Selecciona un servicio</option>
        {servicios.map((s, index) => (
          <option key={index} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={profesional}
        onChange={(e) => setProfesional(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      >
        <option disabled value="">Selecciona un profesional</option>
        {profesionales.map((p, index) => (
          <option key={index} value={p}>{p}</option>
        ))}
      </select>

      <select
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      >
        <option disabled value="">Selecciona un horario</option>
        {horarios.map((h, index) => (
          <option key={index} value={h}>{h}</option>
        ))}
      </select>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre completo"
        className="block w-full p-2 border rounded mb-4"
      />

      <input
        type="tel"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono"
        className="block w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleReservar}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Reservar
      </button>
    </div>
  );
};

export default ReservasPublicas;
```