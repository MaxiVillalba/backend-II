import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Ruta de autenticación para redirigir a Github
router.get("/github", passport.authenticate("github", { scope: ['user:email'] }), async (req, res) => {
    console.log(req.user);
});

// Ruta de callback para manejar la respuesta de github
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    if (req.user) {
        req.session.user = req.user;
        return res.redirect("/");
    }

    res.redirect("/login");
});

export default router;
