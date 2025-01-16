export function auth(req, res, next) {
    if (req.session?.user && req.session.admin) {
    next();
    return;
    }
    res.status(401).send({error: "No autorizado"});
}