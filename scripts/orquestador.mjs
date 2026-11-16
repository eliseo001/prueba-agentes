import { execSync } from 'child_process';

const ASUS_SSH = 'elise@192.168.0.98';
const ASUS_PATH = 'C:/Users/elise/projects/prueba-agentes';

// Permite pasar múltiples tareas separadas por espacio, ej: node scripts/orquestador.mjs auditoria tests build
const tareas = process.argv.slice(2);
const tareasAEjecutar = tareas.length > 0 ? tareas : ['auditoria', 'tests', 'build'];

function local(cmd) {
  console.log(`\n[PC Principal] > ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

function remotoAsus(cmd) {
  console.log(`\n[Orden hacia ASUS] > ${cmd}`);
  execSync(`ssh ${ASUS_SSH} "${cmd}"`, { stdio: 'inherit' });
}

try {
  // 1. Sincronizar main con GitHub
  local('git push origin main');

  for (const tarea of tareasAEjecutar) {
    console.log(`\n=== INICIANDO TAREA EN CADENA: ${tarea} ===`);

    const comandosEnAsus = [
      `cd /d "${ASUS_PATH}"`,
      `git checkout feature/asus-docs-analysis`,
      `git pull origin main --no-edit`,
      `node scripts/asus-worker.mjs ${tarea}`,
      `git add .`,
      `git commit -m "docs(asus): resultado de ${tarea}" || echo "Sin cambios nuevos"`,
      `git push origin feature/asus-docs-analysis`
    ].join(' && ');

    remotoAsus(comandosEnAsus);
  }

  // 2. Traer todos los reportes consolidados desde GitHub a la PC Principal
  local('git fetch origin');
  local('git merge origin/feature/asus-docs-analysis --allow-unrelated-histories --no-edit');

  console.log('\n[MVP Completado] Todas las tareas del pipeline se ejecutaron en la ASUS y se integraron aquí.');
} catch (err) {
  console.error('\n[Error en el pipeline MVP]:', err.message);
  process.exit(1);
}