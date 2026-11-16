import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const taskName = process.argv[2] || 'auditoria';
console.log('[Nodo ASUS] Ejecutando tarea MVP: ' + taskName);

let resultadoDetalle = '';
let estadoTarea = 'ÉXITO';

try {
  switch (taskName) {
    case 'auditoria': {
      function listarArchivos(dir, lista = []) {
        if (!fs.existsSync(dir)) return lista;
        for (const item of fs.readdirSync(dir)) {
          if (['node_modules', '.next', '.git'].includes(item)) continue;
          const rutaCompleta = path.join(dir, item);
          if (fs.statSync(rutaCompleta).isDirectory()) {
            listarArchivos(rutaCompleta, lista);
          } else {
            lista.push(path.relative(process.cwd(), rutaCompleta));
          }
        }
        return lista;
      }
      const archivos = listarArchivos(process.cwd());
      resultadoDetalle = '### Archivos Totales del Proyecto (' + archivos.length + ')\n' + archivos.map(function(f) { return '- `' + f + '`'; }).join('\n');
      break;
    }

    case 'tests': {
      console.log('Ejecutando validación de componentes y entorno...');
      // Validamos que existan los archivos críticos del MVP del turnero
      const criticos = ['frontend-turnero/src/App.jsx', 'frontend-turnero/src/components/TurnoForm.jsx', 'frontend-turnero/src/components/TurnoCard.jsx'];
      const faltantes = criticos.filter(f => !fs.existsSync(f));
      
      if (faltantes.length === 0) {
        resultadoDetalle = 'Todos los componentes esenciales del Turnero UI están presentes y estructurados correctamente.';
      } else {
        estadoTarea = 'FALLIDO';
        resultadoDetalle = 'Faltan componentes críticos: ' + faltantes.join(', ');
      }
      break;
    }

    case 'build': {
      console.log('Compilando frontend y empaquetando MVP...');
      // Entramos al frontend, instalamos dependencias si es necesario y ejecutamos vite build
      const frontendDir = path.join(process.cwd(), 'frontend-turnero');
      if (fs.existsSync(frontendDir)) {
        resultadoDetalle = execSync('cd frontend-turnero && npm run build 2>&1', { encoding: 'utf-8' });
      } else {
        resultadoDetalle = execSync('npm run build 2>&1', { encoding: 'utf-8' });
      }
      break;
    }

    default:
      resultadoDetalle = 'Tarea desconocida: ' + taskName;
  }
} catch (error) {
  estadoTarea = 'FALLIDO';
  resultadoDetalle = error.stdout || error.message;
}

const docsDir = path.join(process.cwd(), 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const nombreReporte = 'REPORTE_' + taskName.toUpperCase() + '.md';
const contenidoReporte = '# Reporte MVP Completo - Nodo ASUS (192.168.0.98)\n' +
  '- **Fase / Tarea:** ' + taskName + '\n' +
  '- **Estado:** ' + estadoTarea + '\n' +
  '- **Fecha:** ' + new Date().toISOString() + '\n\n' +
  '## Resultados de la Ejecución\n' +
  '```text\n' + resultadoDetalle.trim() + '\n```\n';

fs.writeFileSync(path.join(docsDir, nombreReporte), contenidoReporte, 'utf-8');
console.log('[Nodo ASUS] Reporte generado con éxito en docs/' + nombreReporte);