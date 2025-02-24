import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    // nombre de la plantilla que renderizará 
    res.render("home", {user: req.session.user}) // objeto con propiedad de user, que contiene los datos 
    // almacenados en la sesión del usuario (req.session.user)
    // Entonces, si hay un usuario autenticado y su información está almacenada en req.session.user, esos datos se pasan a la plantilla home.
})

router.get("/login", (req, res) => {
    res.render("login")
})

export default router