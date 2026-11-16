import React from "react";
import { useState } from "react";

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ nombre: "", precio: "", duracion: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServicios([...servicios, form]);
    setForm({ nombre: "", precio: "", duracion: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Servicios</h1>
      <table className="w-full border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 px-4 py-2 text-center">Nombre</th>
            <th className="border border-slate-600 px-4 py-2 text-center">Precio</th>
            <th className="border border-slate-600 px-4 py-2 text-center">Duración</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio, index) => (
            <tr key={index}>
              <td className="border border-slate-700 px-4 py-2">{servicio.nombre}</td>
              <td className="border border-slate-700 px-4 py-2">{servicio.precio}</td>
              <td className="border border-slate-700 px-4 py-2">{servicio.duracion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() =>
          setForm({ nombre: "", precio: "", duracion: "" })
        }
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
      >
        Nuevo Servicio
      </button>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre del servicio:
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
            Precio:
          </label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duracion" className="block text-sm font-medium text-gray-700">
            Duración:
          </label>
          <input
            type="text"
            name="duracion"
            value={form.duracion}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">
          Agregar Servicio
        </button>
      </form>
    </div>
  );
};

export default Servicios;