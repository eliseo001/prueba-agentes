import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const taskName = process.argv[2] || 'auditoria-general';
console.log(`[Nodo ASUS 192.168.0.98] Ejecutando tarea: ${taskName}...`);

function listarArchivosJS(dir, lista = []) {
  if (!fs.existsSync(dir)) return lista;
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.next', '.git'].includes(item)) continue;
    const rutaCompleta = path.join(dir, item);
    if (fs.statSync(rutaCompleta).isDirectory()) {
      listarArchivosJS(rutaCompleta, lista);
    } else if (/\.(js|jsx|mjs)$/.test(item)) {
      lista.push(path.relative(process.cwd(), rutaCompleta));
    }
  }
  return lista;
}

const archivos = listarArchivosJS(process.cwd());

let resultadoLint = 'Sin script de lint configurado o sin errores.';
try {
  if (fs.existsSync('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    if (pkg.scripts && pkg.scripts.lint) {
      resultadoLint = execSync('npm run lint', { encoding: 'utf-8' });
    }
  }
} catch (error) {
  resultadoLint = error.stdout || error.message;
}

const docsDir = path.join(process.cwd(), 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const contenidoReporte = `# Reporte de Análisis - ASUS Snapdragon (192.168.0.98)
- **Módulo / Tarea:** ${taskName}
- **Fecha de ejecución:** ${new Date().toISOString()}
- **Rama de trabajo:** feature/asus-docs-analysis

## Archivos JS/JSX Auditados (${archivos.length})
${archivos.map(f => `- \`${f}\``).join('\n') || '- Sin archivos JS detectados'}

## Diagnóstico de Linter
\`\`\`text
${resultadoLint.trim()}
\`\`\`
`;

fs.writeFileSync(path.join(docsDir, 'REPORTE_ASUS.md'), contenidoReporte, 'utf-8');
console.log('[Nodo ASUS 192.168.0.98] Reporte guardado en docs/REPORTE_ASUS.md');