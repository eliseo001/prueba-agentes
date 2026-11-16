import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Servicios from './Servicios';
import Profesionales from './Profesionales';
import Clientes from './Clientes';
import Calendario from './Calendario';
import Turnos from './Turnos';
import ReservasPublicas from './ReservasPublicas';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Switch>
          <Route path="/b/:slug" render={(props) => <ReservasPublicas {...props} sidebar={false} />} />
          <Route exact path="/" component={Servicios} />
          <Route path="/profesionales" component={Profesionales} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/calendario" component={Calendario} />
          <Route path="/turnos" component={Turnos} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;