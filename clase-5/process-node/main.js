// console.log(process.cwd()) // ruta absoluta del directorio actual
// console.log(process.pid) // Obtenemos el ID del proceso PID
// console.log(process.memoryUsage()) // Memoria utilizada en el proceso 
// console.log(process.env); // Variables de entorno del sistema
// console.log(process.argv); // Obtenemos los argumentos que se pasan al ejecutar el script
// console.log(process.version); // Pbtenemos la versión de node

// const argv = process.argv.slice(2)
// console.log(argv)

//--------------------------------------------------------------
// Commander
//--------------------------------------------------------------
import { Command } from "commander"

const program = new Command();

program
.option("-d, --debug", "Habilitar el modo de depuración", false)
.option("-p, --port <port>", "Puerto de escucha", 5173)
.requiredOption("-u, --user <user>", "User de la DB")

program.parse();

const options = program.opts
console.log(options);
