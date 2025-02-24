export function validate(dto) {
    return (req, res, next) => {
        const {error} = dto.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        next(); 
    }
}