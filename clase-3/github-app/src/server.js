import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import MongoStore from 'connect-mongo'
import session from 'express-session';
import handlebars from 'express-handlebars';
import path from 'path';
import __dirname from './dirname.js';
import viewsRoutes from "./routes/views.routes.js"
import sessionRoutes from "./routes/sessions.router.js"
import { initializePassport } from "./config/passport.config.js";
import passport from 'passport';

const app = express();
const PORT = 1989;

// Express config
app.use(express.json()); // analiza solicitudes con cuerpo formato JSON
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
    session({
        secret: "s3cr3t",
        resave: false,
        saveUninitialized: false,
    })
);

// Mongoose 
mongoose
    .connect(process.env.MONGO_CNN)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

// Passport config
initializePassport(); // Configura passport 
// Por ejemplo, una estrategia "local" podría validar credenciales
app.use(passport.initialize());

// Handlebars Config
app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "main", // Corregí el error de "dafaultLayout"
    })
);

app.set("view engine", "hbs"); // Especifica el motor de vistas que se debe usar
app.set("views", path.join(__dirname, 'views')); //asegura que la ruta este bien configurada
// Routes config 
app.use("/api/sessions", sessionRoutes);
app.use("/", viewsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
