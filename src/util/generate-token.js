const jwt = require("jsonwebtoken")

const generateAccessToken = async (user) => {
    const payload = { id: user.id, role: user.role }
    return jwt.sign(
        payload,
        process.env.SECRETKEY,
        { expiresIn: "180m" }
    )
}

const generateRefreshToken = async (user) => {
    const payload = { id: user.id, role: user.role }
    return jwt.sign(
        payload,
        process.env.SECRETKEY,
        { expiresIn: "90d" }
    )
}

module.exports = {
    generateAccessToken, 
    generateRefreshToken
}
