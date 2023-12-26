const jwt = require("jsonwebtoken")

const generateAccessToken = async (user) => {
    const payload = { id: user.id, role: user.role }
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "180m" }
    )
}

const generateRefreshToken = async (user) => {
    const payload = { id: user.id, role: user.role }
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "90d" }
    )
}

const generateEmailVerificationToken = async (user) => {
    const payload = { id: user.id }
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    )
}

const generateResetPasswordToken = async (user) => {
    const payload = { id: user.id }
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "60m" }
    )
}

module.exports = {
    generateAccessToken, 
    generateRefreshToken,
    generateEmailVerificationToken,
    generateResetPasswordToken
}
