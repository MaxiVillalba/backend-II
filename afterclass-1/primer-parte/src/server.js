import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import passport from "passport";

import authRoutes from "./routes/auth.routes.js";
import { initializePassport } from "./config/passport.config.js";

const app = express();
const PORT = 5000;

// Express configuracion 

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport configuracion

initiacizePassport();
app.use(passport.initialize());

// Mongoose
mongoose
.connect("mongodb://localhost:27017/auth")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error);
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



