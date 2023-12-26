const jwt = require("jsonwebtoken")
const prismaClient = require("../application/database.js")
const User = prismaClient.user

const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
        res.status(401).send({ errors: "Unauthorized" }).end();
    } else {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.SECRET_KEY)
        const user = await User.findUnique({ where: { id: decodedRefreshToken.id } })
        if (!user) {
            res.status(401).send({ errors: "Unauthorized" }).end();
        } else {
            req.user = user;
            next();
        }
    }
};


module.exports = authMiddleware