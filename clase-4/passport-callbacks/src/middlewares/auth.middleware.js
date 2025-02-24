

export function authorize(...roles) {
    return (req, res, next) => {
        const { role } = req.user;
        if (!roles.includes(role)) {
            return res.status(403).json({ message: "Forbidden", details: "You don't have permission to access this resource" });
        } next();
        
        if (!roles.includes(user.role)) {
            return res.status(403).json({
                message: "Forbidden",
                details: "You don't have permission to access this resource",
            });
        }
        next();
    };
}