import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const app = express();
const FileStoreInstance = FileStore(session); // Inicializar FileStore
const SECRET = "clavesecreta";

// Mongo URL
const mongoUser = "massevillalba"; // Usuario MongoDB
const mongoPassword = "Cersei2024!"; // Contraseña MongoDB
const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@clustervillalba.cocqh.mongodb.net/backend2-clase2?retryWrites=true&w=majority`;

app.use(cookieParser());

// FileStorage Sessions
/*
app.use(session({
    secret: SECRET,
    store: new FileStoreInstance({ // Usar correctamente el almacenamiento de sesiones
        path: "./sessions",
        ttl: 10,
        retries: 0,
    }),
    resave: false,
    saveUninitialized: false,
}));
*/

// Configuración de MongoDB como almacén de sesiones
app.use(
  session({
    secret: SECRET,
    store: MongoStore.create({
      mongoUrl: mongoUrl, // URL completa de MongoDB con usuario y contraseña
      collectionName: 'sessions',  // Nombre de la colección de sesiones (opcional)
      ttl: 10,  // Tiempo de vida en segundos (10 segundos)
      autoRemove: 'native',  // Eliminar las sesiones antiguas
    }),
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  console.log(req.session);
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Counter: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send("Welcome :)");
  }
});

const PORT = process.env.PORT || 1989;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
