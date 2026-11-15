const sqlite3 = require('sqlite3').verbose();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http'); // <-- Nuevo: Para llamar a la API de Ollama

const db = new sqlite3.Database('./tasks.db');

// Inicializar la tabla
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        command TEXT NOT NULL,
        target_node TEXT NOT NULL,
        output_file TEXT,
        status TEXT DEFAULT 'PENDING',
        attempts INTEGER DEFAULT 0,
        max_attempts INTEGER DEFAULT 3,
        error_log TEXT
    )`);
});

// Agregar tarea
function addTask(title, command, targetNode, outputFile = null) {
    const stmt = db.prepare(`INSERT INTO tasks (title, command, target_node, output_file) VALUES (?, ?, ?, ?)`);
    stmt.run(title, command, targetNode, outputFile, function(err) {
        if (err) {
            console.error("Error al agregar tarea:", err.message);
        } else {
            console.log(`[ENCOLADA] Tarea #${this.lastID} registrada con éxito.`);
        }
    });
    stmt.finalize();
}

// Listar tareas
function listTasks() {
    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log("\n--- ESTADO DE LA COLA DE TAREAS ---");
        console.table(rows);
    });
}

// Función auxiliar para manejar el fin de la tarea
function finishTask(task, code, startTime, bytesWritten = 0) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n\n==================================================`);
    if (code === 0) {
        console.log(`[✔] TAREA #${task.id} COMPLETADA CON ÉXITO`);
        console.log(`    - Tiempo total: ${duration} segundos`);
        if (task.output_file) {
            console.log(`    - Archivo guardado: ${task.output_file}`);
            console.log(`    - Tamaño de salida: ${bytesWritten} bytes`);
        }
        db.run(`UPDATE tasks SET status = 'COMPLETED', error_log = NULL WHERE id = ?`, [task.id]);
    } else {
        console.log(`[✖] TAREA #${task.id} FALLÓ`);
        console.log(`    - Código de salida: ${code}`);
        console.log(`    - Tiempo total: ${duration} segundos`);
        db.run(`UPDATE tasks SET status = 'FAILED', error_log = ? WHERE id = ?`, [`Exit code/Error ${code} (${duration}s)`, task.id]);
    }
    console.log(`==================================================\n`);
}

// Ejecutar tareas
function runPendingTasks() {
    db.all(`SELECT * FROM tasks WHERE status = 'PENDING' AND attempts < max_attempts`, [], (err, rows) => {
        if (err) {
            console.error("Error al buscar tareas:", err.message);
            return;
        }

        if (rows.length === 0) {
            console.log("No hay tareas pendientes para ejecutar.");
            return;
        }

        rows.forEach(task => {
            const startTime = Date.now();
            
            console.log(`\n==================================================`);
            console.log(`[▶] INICIANDO TAREA #${task.id}`);
            console.log(`    - Título:  ${task.title}`);
            console.log(`    - Nodo:    [${task.target_node.toUpperCase()}]`);
            if (task.output_file) console.log(`    - Destino: ${task.output_file}`);
            console.log(`==================================================\n`);
            
            db.run(`UPDATE tasks SET status = 'RUNNING', attempts = attempts + 1 WHERE id = ?`, [task.id]);

            let fileStream = null;
            if (task.output_file) {
                const dir = path.dirname(task.output_file);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                fileStream = fs.createWriteStream(task.output_file);
            }

            // === LÓGICA PARA NODOS REMOTOS (SSH / Comandos normales) ===
            if (task.target_node !== 'local') {
                const parts = task.command.split(' ');
                const child = spawn(parts[0], parts.slice(1), { shell: true });
                let bytesWritten = 0;

                child.stdout.on('data', (data) => {
                    process.stdout.write(data);
                    if (fileStream) { fileStream.write(data); bytesWritten += data.length; }
                });

                child.stderr.on('data', (data) => {
                    process.stderr.write(data);
                });

                const timer = setTimeout(() => { child.kill(); }, 600000);

                child.on('close', (code) => {
                    clearTimeout(timer);
                    if (fileStream) fileStream.end();
                    finishTask(task, code, startTime, bytesWritten);
                });
            } 
            
            // === LÓGICA PARA IA (API de Ollama) ===
            else {
                // Extraer el prompt puro (limpia si el usuario puso 'ollama run' por costumbre)
                let model = 'qwen2.5-coder:7b';
                let prompt = task.command;
                
                if (prompt.startsWith("ollama run") || prompt.startsWith("echo")) {
                    const match = prompt.match(/ollama run ([\w.-:]+)\s+['"]?(.+?)['"]?$/is) || prompt.match(/echo ['"]?(.+?)['"]?\s*\|\s*ollama run ([\w.-:]+)/is);
                    if (match && prompt.startsWith("echo")) {
                        prompt = match[1]; model = match[2];
                    } else if (match) {
                        model = match[1]; prompt = match[2];
                    }
                }

                // El secreto profesional: Instrucciones de sistema para forzar solo código
                const reqData = JSON.stringify({
                    model: model,
                    prompt: prompt,
                    system: "Eres un generador de código experto. Devuelve EXCLUSIVAMENTE el código puro. NO uses saludos, NO des explicaciones y NO envuelvas el código en bloques markdown (como ```jsx o ```).",
                    stream: true
                });

                const req = http.request({
                    hostname: 'localhost',
                    port: 11434,
                    path: '/api/generate',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(reqData) }
                }, (res) => {
                    let bytesWritten = 0;

                    // Procesar el texto a medida que llega de la GPU
                    res.on('data', (chunk) => {
                        try {
                            const lines = chunk.toString().split('\n').filter(l => l.trim() !== '');
                            for (const line of lines) {
                                const json = JSON.parse(line);
                                if (json.response) {
                                    process.stdout.write(json.response);
                                    if (fileStream) {
                                        fileStream.write(json.response);
                                        bytesWritten += Buffer.byteLength(json.response);
                                    }
                                }
                            }
                        } catch (e) { /* Ignorar trozos incompletos */ }
                    });

                    res.on('end', () => {
                        if (fileStream) fileStream.end();
                        finishTask(task, 0, startTime, bytesWritten);
                    });
                });

                req.on('error', (e) => {
                    console.error(`\n[ERROR DE API] Error conectando con Ollama: ${e.message}`);
                    if (fileStream) fileStream.end();
                    finishTask(task, 1, startTime, 0);
                });

                req.write(reqData);
                req.end();
            }
        });
    });
}

const args = process.argv.slice(2);
if (args[0] === 'add') { addTask(args[1], args[2], args[3] || 'local', args[4] || null); }
else if (args[0] === 'list') { listTasks(); }
else if (args[0] === 'run') { runPendingTasks(); }
else {
    console.log("\nUso del coordinador:");
    console.log("  node coordinator.js add 'Título' 'prompt' 'local' 'ruta/archivo.jsx'");
    console.log("  node coordinator.js list");
    console.log("  node coordinator.js run\n");
}