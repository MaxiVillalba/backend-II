import jwt from "jsonwebtoken";
import { Router as ExpressRouter } from "express";

import { SECRET } from "../utils/jwt.js"
import { POLICIES } from "../utils/policies.js";

export class Router {
  router;

  constructor() {
    this.router = ExpressRouter();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {
    // Este método lo puedes dejar vacío si no necesitas lógica adicional
  }

    /**
   * 
   * @param { String} path 
   * @param { String[]} policies 
   * @param  { Function[] } callbacks 
   */

  get(path, policies, ...callbacks) {
    // Se pasan los callbacks directamente

    this.router.get(
      path, 
      this.generateCustomResponses, 
      this.handlePolicies(policies), 
      this.applyCallbacks(callbacks));
  }

  /**
   * 
   * @param { String} path 
   * @param { String[]} policies 
   * @param  { Function[] } callbacks 
   */

  post(path, policies, ...callbacks) {
    // Se pasan los callbacks directamente

    this.router.post(
    path, 
    this.generateCustomResponses, 
    this.handlePolicies(policies), 
    this.applyCallbacks(callbacks));
  }

  /**
   * 
   * @param { String} path 
   * @param { String[]} policies 
   * @param  { Function[] } callbacks 
   */

  put(path, policies, ...callbacks) {
    // Se pasan los callbacks directamente

    this.router.put(
    path, 
    this.generateCustomResponses, 
    this.handlePolicies(policies), 
    this.applyCallbacks(callbacks));
  }

  /**
   * 
   * @param { String} path 
   * @param { String[]} policies 
   * @param  { Function[] } callbacks 
   */

  delete(path, policies, ...callbacks) {
    // Se pasan los callbacks directamente

    this.router.delete(
    path, 
    this.generateCustomResponses, 
    this.handlePolicies(policies), 
    this.applyCallbacks(callbacks));
  }

  /**
   * 
   * @param { Function[] } callbacks 
   */

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      const [req, res] = params;
      try {
        await callback.apply(this, params);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  generateCustomResponses(req, res, next) {
    res.success = (data) => res.json({ message: "Success", data });
    res.userError = (error) => res.status(400).json({ error: "User error", details: error });
    res.authError = (error) => res.status(401).json({ error: "Auth Error", details: error });
    res.forbidden = () => res.status(403).json({ error: "Forbidden" });
    res.serverError = (error) => res.status(500).json({ error: "Server error", details: error });

    next();
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies.includes(POLICIES.PUBLIC)) return next();

      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer "))  {
        return res.authError("Authorization header is invalid, must be in the formar 'Bearer <token>'");
}
      const [_, token] = authHeader.split(" ");
      try {
        const decoded = jwt.verify(token, SECRET);
        if (!policies.includes(decoded.role)) return res.forbidden();
        req.user = decoded;
        next();
      } catch (error) {
        return res.authError("Invalid token");
      }
    };
  }
}

//   applyCallbacks(callbacks) {
//     // Devuelvo una función middleware que aplica los callbacks
//     return async (req, res, next) => {
//       try {
//         // Usamos map para ejecutar cada callback de manera secuencial
//         await Promise.all(
//           callbacks.map(async (callback) => {
//             // Asegúrate de que cada callback reciba correctamente req, res y next
//             await callback(req, res, next);
//           })
//         );
//         next(); // Llamamos a next() si todos los callbacks se ejecutaron sin errores
//       } catch (error) {
//         // Si algún callback lanza un error, lo manejamos aquí
//         console.error('Error en el callback:', error); // Agregué un console.log para depuración
//         return res.status(500).json({ error: "Error interno del servidor" }); // Enviar respuesta 500
//       }
//     };
//   }

