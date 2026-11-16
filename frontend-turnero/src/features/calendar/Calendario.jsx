import React from 'react';

const Calendario = () => {
  return (
    <div className="grid grid-cols-7 gap-4 h-screen">
      <div>Horas</div>
      {Array.from({ length: 10 }, (_, i) => (
        <React.Fragment key={i}>
          <div className="bg-gray-200">{(9 + i).toString().padStart(2, '0')}:00 - {(10 + i).toString().padStart(2, '0')}:00</div>
          {Array.from({ length: 7 }, (_, j) => (
            <div key={j} className="bg-white"></div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Calendario;