import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Se agrega `unique: true` para evitar duplicados
    phone: { type: String, required: true }, // Se agrega el campo "phone"
}, { 
    timestamps: true // Agrega automáticamente createdAt y updatedAt
});

export const Contact = model("contact", contactSchema);
