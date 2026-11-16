import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Turnos = ({ turnos }) => {
  return (
    <ListGroup>
      {turnos.map((turno, index) => (
        <ListGroup.Item key={index}>
          <div className="flex justify-between">
            <span>{turno.fecha} - {turno.hora}</span>
            <span>{turno.cliente}</span>
            <span>{turno.servicio}</span>
            <span>{turno.profesional}</span>
            <span>{turno.estado}</span>
          </div>
          <div className="flex justify-end">
            {turno.estado === 'Pendiente' && (
              <>
                <button
                  onClick={() => handleConfirmar(turno.id)}
                  className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => handleCancelar(turno.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Turnos;