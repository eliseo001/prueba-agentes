import { execSync } from 'child_process';

const backlogMVP = [
  {
    titulo: "1. AuthContext",
    prompt: "Escribí el componente AuthContext.jsx en React. Debe exportar AuthProvider y useAuth. Usá un estado para simular el usuario logueado (role: 'propietario', negocio_id: 1). Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/context/AuthContext.jsx"
  },
  {
    titulo: "2. Dashboard UI",
    prompt: "Escribí el componente Dashboard.jsx. Mostrá 4 tarjetas con KPIs: Turnos hoy, Ingresos estimados, Pendientes y Cancelados. Usá Tailwind CSS y lucide-react para los íconos. Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/features/dashboard/Dashboard.jsx"
  },
  {
    titulo: "3. App Routing",
    prompt: "Escribí el componente App.jsx actualizando las rutas. Importá AuthProvider de './context/AuthContext.jsx' y Dashboard de './features/dashboard/Dashboard.jsx'. Configurá React Router DOM. Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/App.jsx"
  }
];

console.log('=== CARGANDO BACKLOG MVP EN LA COLA DE TAREAS ===');
for (const tarea of backlogMVP) {
  try {
    // Escapamos comillas dobles para que la terminal no se rompa
    const promptSeguro = tarea.prompt.replace(/"/g, '\\"');
    execSync(`node coordinator.js add "${tarea.titulo}" "${promptSeguro}" "local" "${tarea.archivo}"`);
    console.log(`[+] Tarea encolada: ${tarea.titulo}`);
  } catch (err) {
    console.error(`[-] Error al encolar ${tarea.titulo}`);
  }
}