import express from 'express';
import { authenticate, generateToken, isValidEmail } from './utils.js'; // Importando utils desde un archivo utils.js

const app = express();

// Suponiendo que 'users' es un arreglo que almacena los usuarios registrados
const users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registro de usuario
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'falta info' });
    }

    // Validamos el formato del email usando utils
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Correo electrónico no válido' });
    }

    // Guardamos el usuario directamente sin cifrar la contraseña
    const user = {
        name, 
        email,
        password // No estamos cifrando la contraseña
    };

    users.push(user); // Guardamos el usuario
    res.json(user); // Enviamos la respuesta con el usuario creado
});

// Inicio de sesión (login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'falta info' });
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json({ error: 'usuario no encontrado' });
    }

    // Verificamos si la contraseña es correcta
    if (user.password !== password) {
        return res.status(400).json({ error: 'contraseña incorrecta' });
    }

    // Generar un token JWT si la autenticación es correcta
    const payload = { email: user.email, name: user.name };
    const token = generateToken(payload); // Aquí generamos el token

    res.json({ token, message: 'Login exitoso' }); // Enviamos el token al cliente
});

// Endpoint protegido para obtener el perfil del usuario
app.get('/profile', authenticate, (req, res) => {
    const { user } = req; // Esto lo ponemos asumiendo que 'authenticate' agrega al usuario al request
    res.json({ user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
