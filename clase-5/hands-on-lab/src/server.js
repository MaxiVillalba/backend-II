import morgan from "morgan";
import express from "express";
import { connect } from "mongoose";

import { CONFIG } from "./config/config.js";
import { router } from "./routes/index.routes.js";
import { PERSISTANCE } from "./utils/persistance.js";

const app = express();

// Configuración de express
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
if (CONFIG.PERSISTANCE === PERSISTANCE.MONDO_DB) {
connect(CONFIG.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error(error));
}
// Configuración de rutas
app.use("/api", router);

// Start server
app.listen(CONFIG.PORT, () => {
    console.log(`Server running on port ${CONFIG.PORT}`)
})