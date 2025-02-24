import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, generateToken } from './utils.js';

const app = express();
const PORT = 5000;

let users = [];

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) 
        return res.status(400).json({ message: "All fields are required" });

    const user = { name, email, password };
    users.push(user);  // Guardar el usuario en el arreglo
    res.json({ user, message: "User created successfully" });
});

// Ruta para hacer login y obtener un token
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(400).json({ message: "All fields are required" });

    // Buscar el usuario por su correo electrónico
    const user = users.find(user => user.email === email);
    if (!user) return res.status(401).json({ message: "User not found" });

    // Verificar que la contraseña coincida
    if (user.password !== password) 
        return res.status(401).json({ message: "Invalid credentials" });

    // Crear el payload para el token
    const payload = {
        email: user.email,
        name: user.name
    };

    // Generar el token
    const token = generateToken(payload);
    res.json({ token, message: "User logged in successfully" });
});

// Ruta protegida para obtener el perfil del usuario
app.get('/profile', authenticate, (req, res) => {
    // Buscar al usuario en el arreglo usando el email del token decodificado
    const user = users.find((user) => user.email === req.user.email); 
    if (!user) return res.status(401).json({ message: "User not found" });

    res.json({
        user,
        message: "User profile fetched successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});