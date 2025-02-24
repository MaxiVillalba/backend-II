import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, // Aseguramos que el email sea de tipo String y requerido
    age: { type: Number, required: true, default: 0 }, // Definimos 'age' como un número y con valor por defecto 0
    githubId: { type: String, required: true } // Aseguramos que githubId sea de tipo String y requerido
});

export const userModel = model("user", userSchema);
