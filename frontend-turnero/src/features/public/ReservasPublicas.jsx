import React, { useState } from 'react';

const ReservasPublicas = () => {
    const [servicio, setServicio] = useState('');
    const [profesional, setProfesional] = useState('');
    const [horario, setHorario] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const servicios = ['Corte de Pelo', 'Tinte', 'Manicure'];
    const profesionales = ['Juan', 'María', 'Pedro'];
    const horarios = ['10:00 AM', '12:00 PM', '2:00 PM'];

    const handleReservar = () => {
        // Lógica para reservar
        alert('Reserva realizada con éxito!');
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Realizar Reserva</h1>
            <select value={servicio} onChange={(e) => setServicio(e.target.value)} className="border p-2 mb-4 w-full">
                {servicios.map((s, index) => (
                    <option key={index} value={s}>{s}</option>
                ))}
            </select>
            <select value={profesional} onChange={(e) => setProfesional(e.target.value)} className="border p-2 mb-4 w-full">
                {profesionales.map((p, index) => (
                    <option key={index} value={p}>{p}</option>
                ))}
            </select>
            <div className="grid grid-cols-3 gap-4">
                {horarios.map((h, index) => (
                    <button
                        key={index}
                        onClick={() => setHorario(h)}
                        className={`border p-2 ${horario === h ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {h}
                    </button>
                ))}
            </div>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className="border p-2 mb-4 w-full" />
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" className="border p-2 mb-4 w-full" />
            <button onClick={handleReservar} className="bg-blue-500 text-white border p-2 w-full">Reservar</button>
        </div>
    );
};

export default ReservasPublicas;