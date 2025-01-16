import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connect } from "mongoose";
import handlebars from "express-handlebars";
import { __dirname } from "./dirname.js"
import path from "path";
import { viewsRouter } from "./routes/views.routes.js"
import { sessionRouter } from "./routes/session.routes.js";

const app = express();
const SECRET = "clavesecreta";

// Mongo URL
const mongoUser = ""; // Usuario MongoDB
const mongoPassword = ""; // Contraseña MongoDB
const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@clustervillalba.cocqh.mongodb.net/backend2-clase2?retryWrites=true&w=majority`;

app.use(express.json());  // Esto permite procesar las solicitudes JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de sesión con MongoStore
app.use(
  session({
    secret: SECRET,
    store: MongoStore.create({
      mongoUrl: mongoUrl, // URL de MongoDB
      ttl: 10,  // Tiempo de vida en segundos
      autoRemove: 'native',  // Eliminar sesiones antiguas
    }),
    resave: false,
    saveUninitialized: false,
  })
);

// Conexión a MongoDB
connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// Configuración de Handlebars (si se utilizan vistas)
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayouts: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Rutas
app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);

// Servidor escuchando en el puerto 1989
const PORT = process.env.PORT || 1989;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
