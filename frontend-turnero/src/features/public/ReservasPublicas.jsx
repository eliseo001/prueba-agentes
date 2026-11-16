import React, { useState } from 'react';

const ReservasPublicas = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleProfessionalChange = (event) => {
    setSelectedProfessional(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Reserva realizada:', {
      servicio: selectedService,
      profesional: selectedProfessional,
      fecha: date.toISOString().split('T')[0],
      hora: time,
      nombre: name,
      telefono: phone
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <select
          value={selectedService}
          onChange={handleServiceChange}
          className="w-full px-4 py-2 mb-3 border rounded"
        >
          <option value="">Selecciona un servicio</option>
          <option value="corte">Corte de pelo</option>
          <option value="tintura">Tintura</option>
        </select>

        <select
          value={selectedProfessional}
          onChange={handleProfessionalChange}
          className="w-full px-4 py-2 mb-3 border rounded"
        >
          <option value="">Selecciona un profesional</option>
          <option value="juan">Juan Perez</option>
          <option value="maria">Maria Gomez</option>
        </select>

        <div className="mb-3">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Hora
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700"
        >
          Reservar
        </button>
      </form>
    </div>
  );
};

export default ReservasPublicas;