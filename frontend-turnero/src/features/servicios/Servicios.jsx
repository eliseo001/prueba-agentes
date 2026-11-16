import React from "react";
import { Button } from "./Button";

const Servicios = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Duración</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de servicios aquí */}
        </tbody>
      </table>
      <Button type="button" onClick={() => alert("Formulario de nuevo servicio")}>
        Nuevo Servicio
      </Button>
    </div>
  );
};

export default Servicios;