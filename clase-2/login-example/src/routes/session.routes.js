import { Router } from "express";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const sessionRouter = Router();

// Login
sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validación de campos requeridos
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validar la contraseña con bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Guardar la sesión del usuario
        req.session.user = {
            id: user._id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
        };

        res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error", details: error.message });
    }
});

// Register
sessionRouter.post("/register", async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;

    // Validación de campos requeridos
    if (!first_name || !last_name || !age || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Verificar si el usuario ya existe (email debe ser único)
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la base de datos
        const user = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully", userId: user._id });
    } catch (error) {
        console.error("Error creating user:", error);

        // Manejo de errores específicos de duplicidad
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Manejo de otros errores
        res.status(500).json({ message: "Internal server error", details: error.message });
    }
});

// Logout
sessionRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).json({ message: "Failed to log out", details: err.message });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});
