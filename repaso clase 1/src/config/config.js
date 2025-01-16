import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  mongoUri: process.env.MONGO_URI || '', // URI de MongoDB
  folderName: 'repaso-clase-1',         // Nombre de la carpeta que se creará
  folderPath: path.resolve(process.cwd(), 'repaso-clase-1'), // Ruta absoluta
};
