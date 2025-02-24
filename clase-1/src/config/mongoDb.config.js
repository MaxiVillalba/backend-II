import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

// Cargar las variables de entorno desde el archivo .env
configDotenv();

const mongoURI = process.env.MONGO_URI;

// Verificar que la URI de MongoDB esté presente
if (!mongoURI) {
    console.error('Error: La URI de MongoDB no está definida en el archivo .env');
    process.exit(1);
}

export const connectToMongoDb = async () => {
    try {
        // Conexión a MongoDB sin las opciones obsoletas
        await mongoose.connect(mongoURI);
        console.log("MongoDB conectado");
    } catch (error) {
        console.log("Error conectando a MongoDB", error);
        throw error; // Se lanza el error para que sea manejado en el lugar donde se hace la llamada
    }
};
