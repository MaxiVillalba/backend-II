import { Router } from "express";
import { pets } from "../data.js";

const router = Router();

// Declaramos regex una sola vez al inicio
const regex = /^[A-Za-z\s]+$/;

// Función para validar datos de la mascota
const validatePetData = (name, species) => {
    if (!name || !species) return { valid: false, error: "Los campos 'name' y 'species' son obligatorios" };
    if (!regex.test(name) || (species && !regex.test(species))) {
        return { valid: false, error: "Formato no válido: solo letras y espacios" };
    }
    return { valid: true };
};

// Función para buscar una mascota por su nombre
const findPetByName = (name) => pets.find((p) => p.name.toLowerCase() === name.toLowerCase());

// Función: Responder de manera consistente
const sendResponse = (res, status, message, data = {}) => {
    res.status(status).json({ message, ...data });
};

// Middleware: router.param para acceder directamente a la mascota
router.param("pet", (req, res, next, petName) => {
    if (!regex.test(petName)) return sendResponse(res, 400, "Formato inválido: solo letras y espacios");

    const pet = findPetByName(petName);
    if (!pet) return sendResponse(res, 404, "Mascota no encontrada");

    req.pet = pet;
    next();
});

// POST: Agregar una nueva mascota
router.post("/", (req, res) => {
    const { name, species } = req.body;
    const { valid, error } = validatePetData(name, species);
    if (!valid) return sendResponse(res, 400, error);

    if (findPetByName(name)) return sendResponse(res, 409, "La mascota ya existe");

    const newPet = { name, species, adopted: false };
    pets.push(newPet);
    sendResponse(res, 201, "Mascota añadida correctamente", { pet: newPet });
});

// GET: Obtener una mascota (ya validada en router.param)
router.get("/:pet", (req, res) => {
    sendResponse(res, 200, "Mascota encontrada correctamente", { pet: req.pet });
});

// PUT: Marcar una mascota como adoptada
router.put("/:pet", (req, res) => {
    if (req.pet.adopted) return sendResponse(res, 400, "La mascota ya está adoptada");

    req.pet.adopted = true;
    sendResponse(res, 200, "Mascota adoptada correctamente", { pet: req.pet });
});

export default router;
