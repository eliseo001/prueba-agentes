import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;