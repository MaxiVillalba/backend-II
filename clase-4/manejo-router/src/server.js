import express from "express";
import { wordRouter } from "./routes/word.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/dictionary", wordRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});