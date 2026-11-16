const { execSync } = require('child_process');
const fs = require('fs');

console.log("Limpiando la base de datos de tareas...");
try { fs.unlinkSync('./tasks.db'); } catch (e) {}

// FASE 1: Construcción nativa sin bloqueos interactivos
console.log("Creando estructura del proyecto desde cero...");
const dir = './frontend-turnero';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(`${dir}/src`)) fs.mkdirSync(`${dir}/src`, { recursive: true });
if (!fs.existsSync(`${dir}/src/components`)) fs.mkdirSync(`${dir}/src/components`, { recursive: true });

console.log("Generando package.json y archivos base en UTF-8...");
const packageJson = {
  "name": "frontend-turnero",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build" },
  "dependencies": { "react": "^18.2.0", "react-dom": "^18.2.0" },
  "devDependencies": { "@vitejs/plugin-react": "^4.2.1", "vite": "^5.1.4" }
};
fs.writeFileSync(`${dir}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8');

// Configuración de Vite
fs.writeFileSync(`${dir}/vite.config.js`, `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()] });`, 'utf8');

// HTML y Main
fs.writeFileSync(`${dir}/index.html`, `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><title>Turnero</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`, 'utf8');
fs.writeFileSync(`${dir}/src/main.jsx`, `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);`, 'utf8');

console.log("Instalando dependencias en silencio (aguardá unos segundos)...");
execSync("npm install", { cwd: dir, stdio: 'inherit' });

// FASE 2: Encolar trabajo de IA para la RX 6600
const planDeTrabajo = [
    `node coordinator.js add "1. TurnoCard (UI)" "Escribí un componente TurnoCard en React que reciba las props: nombre, fecha, hora y onEliminar. Renderizá una tarjeta con Tailwind CSS y un botón rojo para borrar. Devolvé EXCLUSIVAMENTE el código puro sin comillas invertidas." local "frontend-turnero/src/components/TurnoCard.jsx"`,
    
    `node coordinator.js add "2. TurnoForm (Input)" "Escribí un componente TurnoForm en React que reciba la prop onAgregar(turno). Debe tener inputs controlados para nombre, fecha y hora, y un botón submit. Estilizá con Tailwind CSS. Devolvé EXCLUSIVAMENTE el código puro sin comillas invertidas." local "frontend-turnero/src/components/TurnoForm.jsx"`,
    
    `node coordinator.js add "3. App (Lógica Principal)" "Escribí el componente App.jsx. Importá TurnoForm de './components/TurnoForm.jsx' y TurnoCard de './components/TurnoCard.jsx'. Creá un estado (useState) con un array vacío para guardar turnos. Creá funciones para agregar y eliminar turnos. Renderizá un título, el formulario y el grid de tarjetas. Usá Tailwind CSS. Devolvé EXCLUSIVAMENTE el código puro sin comillas invertidas." local "frontend-turnero/src/App.jsx"`
];

console.log("\nEncolando tareas de IA en el Agente...");
planDeTrabajo.forEach(comando => {
    execSync(comando, { stdio: 'inherit' });
});

console.log("\n==================================================");
console.log("¡Pipeline cargado con éxito! Cero bloqueos interactivos.");
console.log("Ejecutá: node coordinator.js run");
console.log("==================================================\n");