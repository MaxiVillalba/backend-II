// Autenticación => proceso de verificar la identidad de un usuario
// Autorización => proceso de determinar si un usuario tiene permiso para acceder a un recuros.

// Ejemplos: Proteger rutas, brindar acceso a recursos a determinados usuarios, entre otros.

import jwt from 'jsonwebtoken';

const JWT_SECRET = "s3cr3t";

// Generar un token con el payload
export function generateToken(payload) {
    // Jwt.sing => crear un token firmado
    // Payload => datos que van en el token
    // JWT_SECRET => clave secreta para firmar el token 
    // Payload => no debe incluir info sensible, ya que el token puede ser identificado.
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

// Verificar el token con la clave secreta
export function verifyToken(token) {
    try { 
        const decoded = jwt.verify(token, JWT_SECRET); 
        return decoded; 
    } catch (error) {
        throw new Error(`Invalid token ${error}`);
    }
}

// Middleware para autenticar el token
export function authenticate(req, res, next) {
    // Verificar si el encabezado de autorización existe
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // Si existe, dividirlo en dos partes: 'Bearer' y el token
    const token = authHeader.split(' ')[1];  // [1] accede al segundo elemento, que es el token
    if (!token) {
        return res.status(401).json({ error: 'Token is missing from Authorization header' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = verifyToken(token);
        req.user = decoded; 
        next();  // Si es válido, pasamos al siguiente middleware o ruta
    } catch(error) {
        console.log(error); 
        return res.status(401).json({ error: 'Token is invalid' });
    }
}


