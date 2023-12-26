const adminMiddleware = async (req, res, next) => {
    const role = req.user.role
    if (role !== ("admin" || "super-admin")) {
        res.status(401).send({ errors: "Unauthorized" });
    }
    
    next()
}


module.exports = adminMiddleware