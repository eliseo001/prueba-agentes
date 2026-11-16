import { execSync } from 'child_process';

const backlogTotal = [
  // --- FASE 0: CONFIGURACIÓN DEL ENTORNO VITE ---
  {
    titulo: "0.1. Generar package.json",
    prompt: "Genera un archivo package.json válido para un proyecto Vite + React. Debe incluir 'type': 'module', scripts (dev: vite, build: vite build), dependencias (react, react-dom, react-router-dom, lucide-react) y devDependencies (vite, @vitejs/plugin-react). Devuelve EXCLUSIVAMENTE código puro JSON.",
    archivo: "frontend-turnero/package.json"
  },
  {
    titulo: "0.2. Generar vite.config.js",
    prompt: "Genera el archivo vite.config.js usando defineConfig e importando @vitejs/plugin-react. Devuelve EXCLUSIVAMENTE código puro sin markdown.",
    archivo: "frontend-turnero/vite.config.js"
  },
  {
    titulo: "0.3. Generar index.html",
    prompt: "Genera un index.html básico para Vite. Incluye <script src=\"https://cdn.tailwindcss.com\"></script> en el head, un <div id=\"root\"></div> en el body, y un script module apuntando a /src/main.jsx. Devuelve EXCLUSIVAMENTE código HTML puro.",
    archivo: "frontend-turnero/index.html"
  },
  {
    titulo: "0.4. Generar main.jsx",
    prompt: "Genera el archivo main.jsx para React 18. Importa React, ReactDOM, ./App.jsx y renderiza App dentro de React.StrictMode en el root. Devuelve EXCLUSIVAMENTE código puro JS/JSX.",
    archivo: "frontend-turnero/src/main.jsx"
  },

  // --- FASE 1: COMPONENTES DEL MVP ---
  {
    titulo: "1. App Routing",
    prompt: "Escribí el componente App.jsx. Configura react-router-dom con BrowserRouter, Routes y Route para las vistas: /, /servicios, /profesionales, /clientes, /calendario, /turnos, y /b/:slug (reservas). Agrega un Sidebar de navegación con Tailwind. Devuelve EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/App.jsx"
  },
  {
    titulo: "2. Gestión de Servicios",
    prompt: "Escribí el componente Servicios.jsx. Mostrá una tabla con Nombre, Precio y Duración. Incluí un botón 'Nuevo Servicio' para un formulario. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/features/servicios/Servicios.jsx"
  },
  {
    titulo: "3. Gestión de Profesionales",
    prompt: "Escribí el componente Profesionales.jsx. Mostrá una lista de barberos del negocio. Usá Tailwind CSS y lucide-react para los íconos. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/features/profesionales/Profesionales.jsx"
  },
  {
    titulo: "4. Base de Clientes",
    prompt: "Escribí el componente Clientes.jsx. Mostrá una tabla con Nombre, Teléfono y Última Visita. Agregá un input de búsqueda arriba. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/features/clientes/Clientes.jsx"
  },
  {
    titulo: "5. Vista de Calendario",
    prompt: "Escribí el componente Calendario.jsx. Creá una vista semanal usando CSS Grid (Tailwind) donde las columnas son de Lunes a Sábado y las filas bloques de horas. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/features/calendar/Calendario.jsx"
  },
  {
    titulo: "6. Listado de Turnos",
    prompt: "Escribí el componente Turnos.jsx. Mostrá un listado de próximos turnos con Fecha, Hora, Cliente, Servicio, Profesional y Estado. Agregá botones Confirmar/Cancelar. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/features/turnos/Turnos.jsx"
  },
  {
    titulo: "7. Página de Reservas Públicas",
    prompt: "Escribí ReservasPublicas.jsx para celular (mobile friendly). Flujo vertical: 1) Selector Servicio, 2) Selector Profesional, 3) Grilla Horarios, 4) Inputs Nombre/Teléfono, 5) Botón Reservar. Usá Tailwind. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/features/public/ReservasPublicas.jsx"
  }
];

console.log('=== CARGANDO BACKLOG 100% AUTÓNOMO (VITE + MVP) ===');
for (const tarea of backlogTotal) {
  try {
    const promptSeguro = tarea.prompt.replace(/"/g, '\\"');
    execSync(`node coordinator.js add "${tarea.titulo}" "${promptSeguro}" "local" "${tarea.archivo}"`);
    console.log(`[+] Tarea agregada: ${tarea.titulo}`);
  } catch (err) {
    console.error(`[-] Error al encolar ${tarea.titulo}`);
  }
}