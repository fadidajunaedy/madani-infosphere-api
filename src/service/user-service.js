const {
    registerUserValidation,
    verifyEmailUserValidation,
    loginUserValidation,
    updateUserValidation,
    getUserValidation,
    changePasswordUserValidation,
    forgotPasswordValidation,
    resetPasswordUserValidation
} = require("../validation/user-validation.js")
const validate = require("../validation/validation.js")
const hashPassword = require("../util/hash-password.js")
const { 
    generateAccessToken, 
    generateRefreshToken 
} = require("../util/generate-token.js")
const {
    sendEmailVerification, 
    sendEmailResetPassword
} = require("../util/send-mail.js")
const crypto = require("crypto")
const ResponseError = require("../error/response-error.js")
const prismaClient = require("../application/database.js")
const User = prismaClient.user
const VerificationToken = prismaClient.verificationToken

const register = async (request) => {
    const user = validate(registerUserValidation, request)
    
    const usernameExist = await User.findFirst({ where: { username: user.username }})
    if (usernameExist) {
        throw new ResponseError(400, "Username already registered")
    }

    const emailExist = await User.findFirst({ where: { email: user.email }})
    if (emailExist) {
        throw new ResponseError(400, "Email already registered")
    }
    
    user.password = hashPassword(user.password)
    
    const newUser = await User.create(user)

    const verificationToken = await VerificationToken.create({ userId:newUser.id, token: crypto.randomBytes(24).toString("hex") })

    const url = `http://localhost:5173/verify/${verificationToken.userId}/${verificationToken.token}`
    await sendEmailVerification(newUser.email, url)

    return newUser
}

module.exports = {
    register
}