```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Servicios from './Servicios';
import Profesionales from './Profesionales';
import Clientes from './Clientes';
import Calendario from './Calendario';
import Turnos from './Turnos';
import ReservasPublicas from './ReservasPublicas';

const App = () => (
  <Router>
    <div className="App">
      <Sidebar />
      <Switch>
        <Route path="/b/:slug" component={ReservasPublicas} />
        <Route exact path="/" render={() => (
          <>
            <Servicios />
            <Profesionales />
            <Clientes />
            <Calendario />
            <Turnos />
          </>
        )} />
      </Switch>
    </div>
  </Router>
);

const Sidebar = () => (
  <nav className="sidebar">
    {/* Enlaces a las vistas */}
  </nav>
);

export default App;
```