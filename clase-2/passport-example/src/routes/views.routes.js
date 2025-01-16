import { Router } from "express";

export const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    const isSession = req.session.user ? true : false;
    res.render("index", { tittle: "Inicio", isSession});
});

viewsRouter.get("/login", (req, res) => {
    const isSession = req.session.user ? true : false;
    if (isSession) return res.redirect("/profile");
    res.render("login", { tittle: "Iniciar sesión", isSession});

});

viewsRouter.get("/register", (req, res) => {
    const isSession = req.session.user ? true : false;
    if (isSession) return res.redirect("/profile");
    res.render("register", { tittle: "registro", isSession});

});

viewsRouter.get("/restore-password", (req, res) => {
    const isSession = req.session.user ? true : false;
    if (isSession) return res.redirect("/profile")
    res.render("restore-password"), { tittle: "recuperar contraseña", isSession}
})

viewsRouter.get("/profile", (req, res) => {
    const isSession = req.session.user ? true : false;
  
    if (!isSession) return res.redirect("/login");
  
    res.render("profile", { title: "Perfil", user: req.session.user });
  });


