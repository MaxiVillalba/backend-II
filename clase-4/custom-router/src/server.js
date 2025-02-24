import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.router.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// tiene que ser la ultima ruta

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter);
app.use("*", (req, res ) => {
  res.status(404).json({error: "ruta no encontrada"})
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

