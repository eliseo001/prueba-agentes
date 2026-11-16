import React from 'react';

const Calendario = () => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {[1, 2, 3, 4, 5, 6].map(day => (
        <div key={day} className="grid grid-rows-9 gap-1 bg-gray-100 p-2">
          {Array.from({ length: 9 }, (_, hour) => (
            <div key={hour} className="bg-white border rounded-lg shadow-sm p-1 text-center">{`${8 + hour}:00`}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendario;