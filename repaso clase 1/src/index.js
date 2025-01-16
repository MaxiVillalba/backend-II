import 'dotenv/config'; // Cargar las variables de entorno desde el archivo .env
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import authRouter from './routes/authRouter.js';
import { auth } from '../auth.js';
import fs from 'fs';
import { config } from './config/config.js';

import { fileURLToPath } from 'url'; // Usamos el nombre correcto de la función
import path from 'path';

// Configurar __filename y __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la aplicación de Express
const app = express();

// Middlewares globales
// app.use(express.json()); // Parseo de JSON en las solicitudes
// app.use(cookieParser()); // Manejo de cookies

// // Middleware de registro
// const loggerMiddleware = (req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// };
// app.use(loggerMiddleware);

// // Verificar que la URI de MongoDB esté configurada
// if (!config.mongoUri) {
//   throw new Error('La variable MONGO_URI no está configurada en el archivo .env');
// }

// // Crear la carpeta definida en la configuración
// if (!fs.existsSync(config.folderPath)) {
//   fs.mkdirSync(config.folderPath, { recursive: true });
//   console.log(`Carpeta creada: ${config.folderPath}`);
// } else {
//   console.log('La carpeta ya existe.');
// }

// Conectar a MongoDB
// mongoose
//   .connect(config.mongoUri)
//   .then(() => console.log('Conexión a MongoDB exitosa'))
//   .catch((error) => {
//     console.error('Error al conectar a MongoDB:', error);
//     process.exit(1); // Salir del proceso si no se puede conectar
//   });

// // Middlewares personalizados
// function mid1(req, res, next) {
//   req.dato1 = 'Dato 1';
//   next();
// }

// function mid2(req, res, next) {
//   req.dato2 = 'Dato 2';
//   next();
// }

// // Rutas principales
// app.get('/', (req, res) => {
//   res.send('Hola in-mundo');
// });

// app.get('/about', (req, res) => {
//   res.send('About us');
// });

// app.get('/ruta1', mid1, (req, res) => {
//   res.json({ dato1: req.dato1 });
// });

// app.get('/ruta2', mid1, mid2, (req, res) => {
//   res.json({
//     dato1: req.dato1,
//     dato2: req.dato2,
//   });
// });

// Rutas adicionales
// app.use('/api/users', userRouter);
// app.use('/api/auth', authRouter);

// Iniciar el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });






// -------------------------------------------------------------------------------

// Ejemplo Cookies

// app.get('/setCookie', (req, res) => {
//   res.cookie('nombreUno', 'valorUno', {maxAge: 10000}).send('Cookie seteada'); });

// app.get('/getCookie', (req, res) => {
//   res.send(req.cookies.nombreUno); });

// app.get('/deleteCookie', (req, res) => {
//   res.clearCookie('nombreUno').send('cookie eliminadaa 😎👍🏼')
// })




// Cookies firmadas
// app.get('/setSignedCookie', (req, res) => {
//   res.cookie('SignedCookie', 'Está es una cookie muy poderosa', {signed: true}).send('Cookie firmada seteada😎👍🏼');
// })

// app.get('/getSignedCookie', (req, res) => {
//   res.send(req.signedCookies.SignedCookie) });

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); // Parseo de JSON en las solicitudes
// app.use(cookieParser()); // Manejo de cookies

// // Ruta para servir la vista HTML
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Ruta para crear la cookie
// app.post('/set-cookie', (req, res) => {
//   const { user, email } = req.body;

//   if (!user || !email) {
//     return res.status(400).send({ status: 'error', message: 'Faltan datos' });
//   }

//   res.cookie('userCookie', { user, email }, { maxAge: 20000});
//   res.send({
//     status: 'success',
//     message: 'Cookie creada',
//   });
// });

// // Ruta para obtener la cookie
// app.get('/get-cookie', (req, res) => {
//   const cookie = req.cookies.userCookie;

//   if (!cookie) {
//     return res.status(400).send({ status: 'error', message: 'No hay cookie disponible' });
//   }

//   res.send({
//     status: 'success',
//     message: 'Acá tá tu cookie',
//     data: cookie,
//   });
// });

// Iniciar el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });


// -------------------------------------------------------------------------------

// Ejemplo de sesiones

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parseo de JSON en las solicitudes
app.use(session({
  secret: "m4x1m",
  resave: true,
  saveUninitialized: false,
})
);

app.get("/session", (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    return res.json({ contador: req.session.contador });
  }
  req.session.contador = 1;
  return res.json({
    contador: req.session.contador,
    message: "Sesion inciada",
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username != "maxi" || password != "1234") {
    return res.status(401).send("Usuario o contraseña incorrectos");
  }
  req.session.user = username;
  req.session.admin = true;
  return res.json({message: "Sesión iniciada"}); 
});

app.get("/admin", auth, (req, res) => {
  return res.json({ admin: req.session.admin, data: "Información sensible" });
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      return res.json({ message: "Sesión terminada" });
    }
    return res.json({ message: "Error al cerrar la sesión" });
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});