import dotenv from "dotenv";
import path from "path";

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  mongoUri: process.env.MONGO_URI || "", // URI de MongoDB, ahora tomada directamente desde .env
  folderName: "backend2-clase2", // Nombre de la carpeta que se creará
  folderPath: path.resolve(process.cwd(), "backend2-clase2"), // Ruta absoluta
};
