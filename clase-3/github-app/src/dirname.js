// Para determinar la ruta absoluta del archivo actual y su directorio contenedor
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // representa la ubicación del archivo actual
const __dirname = path.dirname(__filename); // devuelve el directorio que contiene el archivo actual

// Hay que asegurarse de siempre tener la ruta absoluta al directorio del archivo actual
export default __dirname;