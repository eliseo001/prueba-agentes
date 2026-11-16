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
      console.log('❌ [ERROR] El Build falló en la ASUS.');
      
      // 1. Detectar si el error es por un paquete no instalado
      if (contenidoBuild.includes('Failed to resolve import')) {
        console.log('⚠️ Detectada falta de dependencias (import no resuelto). Instalando automáticamente...');
        
        // Extraemos el nombre del paquete del log (ej: "react-router-dom")
        const match = contenidoBuild.match(/Failed to resolve import "([^"]+)"/);
        if (match && match[1]) {
          const paqueteFaltante = match[1];
          console.log(`[+] Ejecutando npm install ${paqueteFaltante}...`);
          try {
             // Instalamos la dependencia en el frontend
             execSync(`cd frontend-turnero && npm install ${paqueteFaltante}`, { stdio: 'inherit' });
             console.log('✅ Paquete instalado. El bucle lo reintentará en el próximo ciclo.');
          } catch (e) {
             console.log(`[-] Falló la instalación de ${paqueteFaltante}.`);
          }
        }
      } else {
        // 2. Si es un error de sintaxis o lógica, inyectamos la tarea de auto-corrección a la IA
        console.log('⚠️ Error de código detectado. Inyectando tarea de auto-corrección a la IA...');
        const logLimpio = contenidoBuild.substring(0, 400).replace(/["'\n\r]/g, ' ');
        const promptArreglo = `El último build falló con este error: ${logLimpio}. Revisá las importaciones, sintaxis y corregí el código para que compile. Devolvé EXCLUSIVAMENTE código puro sin comillas.`;
        
        execSync(`node coordinator.js add "Auto-Fix: Error de Build" "${promptArreglo}" "local" "frontend-turnero/src/App.jsx"`);
      }
    }

  } catch (error) {
    console.error('\n[!] El Agente Maestro se detuvo o no encontró más tareas.');
    console.error('Detalle:', error.message);
    bucleActivo = false; // Corta el while si algo a nivel de sistema explota
  }
}