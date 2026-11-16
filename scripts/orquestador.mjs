import { execSync } from 'child_process';

const ASUS_SSH = 'elise@192.168.0.98';
const ASUS_PATH = 'C:/Users/elise/projects/prueba-agentes';
const tarea = process.argv[2] || 'revision-estructura';

function local(cmd) {
  console.log(`\n[PC Principal - main] > ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

function remotoAsus(cmd) {
  console.log(`\n[Orden hacia ASUS 192.168.0.98] > ${cmd}`);
  execSync(`ssh ${ASUS_SSH} "${cmd}"`, { stdio: 'inherit' });
}

try {
  // 1. Subir los cambios de tu PC principal a GitHub (origin main)
  local('git push origin main');

  // 2. Ordenar a la ASUS por SSH que haga pull, ejecute el worker y haga push a GitHub
  const comandosEnAsus = [
    `cd /d "${ASUS_PATH}"`,
    `git checkout feature/asus-docs-analysis`,
    `git pull origin main --no-edit`,
    `node scripts/asus-worker.mjs ${tarea}`,
    `git add .`,
    `git commit -m "docs(asus): ${tarea}" || echo "Sin cambios nuevos"`,
    `git push origin feature/asus-docs-analysis`
  ].join(' && ');

  remotoAsus(comandosEnAsus);

  // 3. Traer la rama de la ASUS desde GitHub y fusionarla en tu PC Principal
  local('git fetch origin');
  local('git merge origin/feature/asus-docs-analysis --no-edit');

  console.log('\n[Listo] La ASUS terminó la tarea y los cambios ya están integrados en tu rama main.');
} catch (err) {
  console.error('\n[Error en el flujo]:', err.message);
  process.exit(1);
}