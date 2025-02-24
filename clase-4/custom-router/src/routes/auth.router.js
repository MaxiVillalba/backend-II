import jwt from "jsonwebtoken";

import { Router } from "./router.js";
import { SECRET } from "../utils/jwt.js";
import { POLICIES } from "../utils/policies.js";


class AuthRouter extends Router {
  init() {
    this.post("/login", [POLICIES.PUBLIC], this.login);
  }

  login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.userError("Email and password are required");
    }

    const token = jwt.sign(
      { id: "abcd", email, role: POLICIES.ADMIN }, // De este lado, cambiamos los roles para poder acceder a las solicitudes correspondientes según los permisos que hayamos configurado
      SECRET,
      { expiresIn: "5m" }
    );

    res.success({ token });
  }
}

export const authRouter = new AuthRouter().getRouter();
