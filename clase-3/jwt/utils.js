import jwt from "jsonwebtoken";
const JWT_SECRET = 'S3CR3T'; // Define tu clave secreta aquí

// Función para generar el token
export function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

// Middleware para autenticar el token
export function authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    // Eliminamos el prefijo "Bearer " y verificamos el token
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).json({ error: 'Token malformado' });
    }

    try {
        const decoded = verifyToken(tokenParts[1]); // Verificamos el token (sin "Bearer")
        req.user = decoded; // Decodificamos el token y lo agregamos al request
        next(); // Llamamos a next() para pasar al siguiente middleware o controlador
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
}

// Función para verificar el token
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error(`Token inválido: ${error.message}`);
    }
}

// Función para validar el formato del email
export function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
