import mongoose from "mongoose";

// Patrón Singleton
// Se crea una única instancia de la conexión a la base de datos
class MongoDBProvider {
  connection = null; // Propiedad que almacenará la conexión a la base de datos
  static instance; // Propiedad estática que almacenará la única instancia de la clase

  constructor() {
    if (MongoDBProvider.instance) { // Si ya existe una instancia, se devuelve esa instancia
      return MongoDBProvider.instance;
    }

    MongoDBProvider.instance = this; // Si no existe, se crea una nueva instancia
  }

  async connect(uri) {
    if (!this.connection) { // Si no hay conexión existente, se intenta conectar
      try {
        this.connection = await mongoose.connect(uri); // Se establece la conexión a la base de datos
      } catch (error) {
        console.error("Error connecting to MongoDB", error); 
      }
    }

    return this.connection; // Devuelve la conexión (existente o nueva)
  }

  getInstance() {
    // return client
    return this.connection; 
  }
}

export const mongodbProvider = new MongoDBProvider(); // Exporta una instancia de la clase MongoDBProvider
