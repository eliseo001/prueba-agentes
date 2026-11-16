import { execSync } from 'child_process';

const backlogMVPCompleto = [
  {
    titulo: "4. Gestión de Servicios",
    prompt: "Escribí el componente Servicios.jsx. Mostrá una tabla con Nombre, Precio y Duración. Incluí un botón 'Nuevo Servicio' para un formulario. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/features/servicios/Servicios.jsx"
  },
  {
    titulo: "5. Gestión de Profesionales",
    prompt: "Escribí el componente Profesionales.jsx. Mostrá una lista de barberos del negocio. Usá Tailwind CSS y lucide-react para los íconos. Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/features/profesionales/Profesionales.jsx"
  },
  {
    titulo: "6. Base de Clientes",
    prompt: "Escribí el componente Clientes.jsx. Mostrá una tabla con Nombre, Teléfono y Última Visita. Agregá un input de búsqueda arriba. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/features/clientes/Clientes.jsx"
  },
  {
    titulo: "7. Vista de Calendario",
    prompt: "Escribí el componente Calendario.jsx. Creá una vista semanal usando CSS Grid (Tailwind) donde las columnas son de Lunes a Sábado y las filas son bloques de horas de 9:00 a 18:00. Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/features/calendar/Calendario.jsx"
  },
  {
    titulo: "8. Listado y Edición de Turnos",
    prompt: "Escribí el componente Turnos.jsx. Mostrá un listado de los próximos turnos con Fecha, Hora, Cliente, Servicio, Profesional y Estado. Agregá botones para Confirmar y Cancelar. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE código puro sin comillas invertidas.",
    archivo: "frontend-turnero/src/features/turnos/Turnos.jsx"
  },
  {
    titulo: "9. Página de Reservas Públicas (Mobile Friendly)",
    prompt: "Escribí ReservasPublicas.jsx. Será la página que ven los clientes finales desde el celular. Diseñá un flujo vertical: 1) Selector de Servicio, 2) Selector de Profesional, 3) Grilla de Horarios disponibles, 4) Inputs de Nombre y Teléfono, 5) Botón Reservar. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/features/public/ReservasPublicas.jsx"
  },
  {
    titulo: "10. Integración de Rutas y Menú Principal",
    prompt: "Reescribí App.jsx. Importá Servicios, Profesionales, Clientes, Calendario, Turnos y ReservasPublicas. Creá un Sidebar de navegación fijo a la izquierda (oculto en móvil) para acceder a estas vistas. La ruta /b/:slug debe cargar ReservasPublicas sin el sidebar. Devolvé EXCLUSIVAMENTE código puro.",
    archivo: "frontend-turnero/src/App.jsx"
  }
];

console.log('=== CARGANDO BACKLOG COMPLETO DEL MVP TURNEROPRO ===');
for (const tarea of backlogMVPCompleto) {
  try {
    const promptSeguro = tarea.prompt.replace(/"/g, '\\"');
    execSync(`node coordinator.js add "${tarea.titulo}" "${promptSeguro}" "local" "${tarea.archivo}"`);
    console.log(`[+] Tarea agregada a la cola: ${tarea.titulo}`);
  } catch (err) {
    console.error(`[-] Error al encolar ${tarea.titulo}`);
  }
}