import express from "express";
import { petsRouter } from "./routes/pets.routes.js";

const app = express();
const PORT = 3000;

//Middleware para parsear JSON
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use("/api/pets", petsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`
    );
});