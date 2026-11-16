import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Home from './views/Home';
import Servicios from './views/Servicios';
import Profesionales from './views/Profesionales';
import Clientes from './views/Clientes';
import Calendario from './views/Calendario';
import Turnos from './views/Turnos';
import Reservas from './views/Reservas';

const App = () => (
  <Router>
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/profesionales" element={<Profesionales />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/b/:slug" element={<Reservas />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;