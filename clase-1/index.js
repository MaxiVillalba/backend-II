import express from 'express';
import { connectToMongoDb } from './src/config/mongoDb.config.js';
import userRoutes from './src/router/user.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';  // Importar el módulo path
import session from 'express-session';

const app = express();

// Conexión a MongoDB
(async () => {
    try {
        await connectToMongoDb();
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);  // Si no se conecta a la base de datos, el servidor se cierra
    }
})();

// Middleware para análisis de JSON y cookies
app.use(express.json());  // Analiza el cuerpo de las solicitudes JSON
app.use(cookieParser('mySecretKey'));  // Analiza las cookies y usa clave secreta para cookies firmadas
app.use(express.urlencoded({ extended: true }));  // Analiza los cuerpos de las solicitudes URL codificadas

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.url}`);
    next();
});

// Ruta principal
app.get('/', (req, res) => { 
    // Usar path.join para crear una ruta absoluta
    const indexPath = path.join(process.cwd(), 'public', 'index.html');  // process.cwd() te da el directorio de trabajo actual
    res.sendFile(indexPath);  // Sirve el archivo index.html
});

// Rutas para trabajar con cookies
app.get('/setCookie', (req, res) => {
    res.cookie('cookieName', 'cookieValue', {
        maxAge: 24 * 60 * 60 * 1000,  // 1 día
        httpOnly: true,
    });
    res.send(req.cookies.cookieName);  // Envía el valor de la cookie
});

app.get('/getCookie', (req, res) => {
    res.send(req.cookies.cookieName);  // Muestra la cookie
});

// Ruta para eliminar una cookie
app.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookieName');  // Elimina la cookie
    res.status(200).json({  // Respondemos con JSON
        status: 'success',
        message: 'Cookie eliminada'
    });
});

app.get('/setSignedCookie', (req, res) => {
    // Establecer una cookie firmada
    res.cookie('cookieName', 'cookieValue', {
        maxAge: 10000 * 60 * 60 * 24,  // 10,000 días (verifica si es correcto)
        httpOnly: true,
        signed: true,  // La cookie será firmada
    });
    res.send('Cookie firmada');
});

app.get('/getSignedCookie', (req, res) => {
    // Obtener una cookie firmada
    const signedCookie = req.signedCookies.cookieName;  // Accede a la cookie firmada

    if (!signedCookie) {
        return res.status(400).send('Cookie no encontrada');
    }

    res.send(`Cookie firmada: ${signedCookie}`);  // Muestra el valor de la cookie firmada
});

// Ruta para crear una cookie con datos de usuario
app.post('/setCookie', (req, res) => { 
    const { userName, userEmail } = req.body;
    if (!userName || !userEmail) {
        return res.status(400).json({  // Cambié a JSON en vez de solo texto plano
            status: 'error',
            message: 'Faltan datos'
        });
    }

    res.cookie('userCookie', { userName, userEmail }, { maxAge: 10000 });
    return res.status(200).json({  // Respuesta de éxito también en JSON
        status: 'success',
        message: 'Cookie creada'
    });
});

// Ruta para obtener la cookie del usuario
app.get('/getCookie', (req, res) => {
    const cookie = req.cookies.userCookie;
    if (!cookie) {
        return res.status(400).send('No hay cookie');
    }
    res.send(cookie);
});


app.get('/session', (req, res) => {
    req.session.visitCount = req.session.visitCount ? req.session.visitCount + 1 : 1;
    res.send(`Visitas: ${req.session.visitCount}`);
});

app.get('/welcome', (req, res) => {
    req.session.counter = 1;
    res.send('Bienvenido');
});
// Puerto y servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
