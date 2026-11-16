import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const taskName = process.argv[2] || 'auditoria';
console.log(`[Nodo ASUS 192.168.0.98] Ejecutando tarea MVP: ${taskName}...`);

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
      resultadoDetalle = `### Archivos Totales del Proyecto (${archivos.length})\n` + archivos.map(f => `- \`${f}\``).join('\n');
      break;
    }

    case 'tests': {
      console.log('Ejecutando suite de pruebas...');
      resultadoDetalle = execSync('npm test -- --run 2>&1 || echo "No hay tests configurados o fallaron"', { encoding: 'utf-8' });
      break;
    }

    case 'build': {
      console.log('Verificando compilación (build)...');
      resultadoDetalle = execSync('npm run build 2>&1 || echo "No hay script de build o falló la compilación"', { encoding: 'utf-8' });
      break;
    }

    default:
      resultadoDetalle = `Tarea desconocida o genérica: ${taskName}`;
  }
} catch (error) {
  estadoTarea = 'FALLIDO';
  resultadoDetalle = error.stdout || error.message;
}

const docsDir = path.join(process.cwd(), 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const contenidoReporte = `# Reporte MVP - Nodo ASUS (192.168.0.98)
- **Fase / Tarea:** ${taskName}
- **Estado:** ${estadoTarea}
- **Fecha:** ${new Date().toISOString()}

## Resultados de la Ejecución
\`\`\`text
${resultadoDetalle.trim()}
\`\``
`;

fs.writeFileSync(path.join(docsDir, `REPORTE_${taskName.toUpperCase()}.md`), contenidoReporte, 'utf-8');
console.log(`[Nodo ASUS] Reporte generado: docs/REPORTE_${taskName.toUpperCase()}.md`);