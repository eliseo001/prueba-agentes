import { execSync } from 'child_process';
import fs from 'fs';

console.log('=== 🤖 INICIANDO AGENTE MAESTRO AUTÓNOMO ===');
console.log('Orquestando PC Principal (Desarrollo) + Nodo ASUS (Validación)\n');

let bucleActivo = true;

while (bucleActivo) {
  try {
    console.log('--------------------------------------------------');
    console.log('>>> FASE 1: DESARROLLO (Ejecutando coordinator.js)...');
    
    // 1. Escribir el código
    // Ejecuta la próxima tarea pendiente en la BD. Si falla o no hay tareas, el catch lo frena.
    const outputRun = execSync('node coordinator.js run', { encoding: 'utf-8' });
    if (outputRun.includes('No hay tareas pendientes')) {
        console.log('\n🎉 ¡BACKLOG COMPLETADO! No hay más tareas en la cola.');
        bucleActivo = false;
        break;
    }

    console.log('\n>>> FASE 2: VALIDACIÓN (Enviando a nodo ASUS)...');
    // 2. Probar el código en la ASUS
    execSync('node scripts/orquestador.mjs auditoria tests build', { stdio: 'inherit' });

    // 3. Traer los resultados
    execSync('git fetch origin', { stdio: 'inherit' });
    execSync('git merge origin/feature/asus-docs-analysis --allow-unrelated-histories --no-edit', { stdio: 'inherit' });

    console.log('\n>>> FASE 3: EVALUACIÓN DE RESULTADOS...');
    const contenidoBuild = fs.readFileSync('docs/REPORTE_BUILD.md', 'utf-8');

    if (contenidoBuild.includes('ÉXITO') || contenidoBuild.includes('dist/')) {
      console.log('✅ [ÉXITO] El código pasó el Build de Vite.');
      
      // Empaquetar y subir progreso a main
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "feat(ai): tarea del backlog completada y validada" || echo "Sin cambios"', { stdio: 'inherit' });
      execSync('git push origin main', { stdio: 'inherit' });
      
    } else {
      console.log('❌ [ERROR] El Build falló en la ASUS. Inyectando tarea de auto-corrección...');
      
      // Limpiamos el error para no romper la consola
      const logLimpio = contenidoBuild.substring(0, 400).replace(/["'\n\r]/g, ' ');
      const promptArreglo = `El último build de Vite falló con este error: ${logLimpio}. Revisá las importaciones, sintaxis y corregí el código para que compile. Devolvé EXCLUSIVAMENTE código puro sin comillas.`;
      
      // Inyectamos una nueva tarea urgente al principio (o final) de la cola
      execSync(`node coordinator.js add "Auto-Fix: Error de Build" "${promptArreglo}" "local" "frontend-turnero/src/App.jsx"`);
      console.log('⚠️ Tarea de corrección encolada. El agente intentará arreglarlo en el próximo ciclo.');
    }

  } catch (error) {
    console.error('\n[!] El Agente Maestro se detuvo o no encontró más tareas.');
    console.error('Detalle:', error.message);
    bucleActivo = false; // Corta el while si algo a nivel de sistema explota
  }
}