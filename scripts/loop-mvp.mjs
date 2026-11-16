import { execSync } from 'child_process';
import fs from 'fs';

const MAX_INTENTOS = 3;
let intento = 1;
let mvpCompletado = false;

console.log('=== INICIANDO BUCLE AUTÓNOMO DE MVP DISTRIBUIDO ===');

while (intento <= MAX_INTENTOS && !mvpCompletado) {
  console.log(`\n--- [CICLO MVP - Intento ${intento} de ${MAX_INTENTOS}] ---`);

  try {
    // 1. Ejecutar el orquestador para barrer el pipeline en la ASUS
    console.log('[1/3] Ejecutando orquestador hacia la ASUS...');
    execSync('node scripts/orquestador.mjs auditoria tests build', { stdio: 'inherit' });

    // 2. Traer y fusionar los cambios locales con la rama remota
    console.log('[2/3] Sincronizando ramas y reportes en PC Principal...');
    execSync('git fetch origin', { stdio: 'inherit' });
    execSync('git merge origin/feature/asus-docs-analysis --allow-unrelated-histories --no-edit', { stdio: 'inherit' });

    // 3. Evaluar el reporte de Build generado por la ASUS
    const rutaBuildReport = 'docs/REPORTE_BUILD.md';
    if (fs.existsSync(rutaBuildReport)) {
      const contenidoBuild = fs.readFileSync(rutaBuildReport, 'utf-8');
      
    if (contenidoBuild.includes('ÉXITO') || contenidoBuild.includes('dist/')) {
        console.log('[3/3] ¡Validación: El Build del MVP fue exitoso!');
        mvpCompletado = true;

        // Consolidación final automática en main asegurando el add
        execSync('git add docs/ package.json scripts/', { stdio: 'inherit' });
        execSync('git commit -m "chore(mvp): cierre automático del ciclo exitoso de desarrollo" || echo "Sin cambios"', { stdio: 'inherit' });
        execSync('git push origin main', { stdio: 'inherit' });
        
        console.log('\n=== ¡MVP COMPLETADO Y SINCRONIZADO AUTOMÁTICAMENTE DE PUNTA A PUNTA! ===');
      } else {
        console.log('[3/3] Alerta: El Build reportó incidencias. Reintentando ciclo de corrección...');
        intento++;
      }
    } else {
      console.log('No se encontró el reporte de build. Reintentando...');
      intento++;
    }

  } catch (error) {
    console.error(`[Error en el ciclo ${intento}]:`, error.message);
    intento++;
  }
}

if (!mvpCompletado) {
  console.log('\n[Aviso]: Se alcanzó el límite de intentos automáticos. Revise los reportes en docs/ para depurar manualmente.');
}