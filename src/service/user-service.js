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
    generateRefreshToken,
    generateEmailVerificationToken
} = require("../util/generate-token.js")
const {
    sendEmailVerification, 
    sendEmailResetPassword
} = require("../util/send-mail.js")
const jwt = require("jsonwebtoken")
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
    
    const newUser = await User.create({
        data: user,
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            position: true,
        }
    })

    const verificationToken = await generateEmailVerificationToken(newUser)

    const userWithVerificationToken = await User.update({
        where: { id: newUser.id },
        data: {
            verificationToken: verificationToken
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            position: true,
            verificationToken: true,
        },
    })

    const url = `http://localhost:5173/auth/verify?${userWithVerificationToken.verificationToken}`
    await sendEmailVerification(userWithVerificationToken.email, url)

    return newUser
}

const verify = async (token) => {
    token = validate(verifyEmailUserValidation, token)

    const findToken = await User.findFirst({ 
        where: { verificationToken: token }
    })

    if (!findToken) {
        throw new ResponseError(404, "Token invalid")
    }

    const decodedVerificationToken = jwt.verify(token, process.env.SECRET_KEY)
    const expirationTime = decodedVerificationToken.exp * 1000
    const currentTime = Date.now()
    if (expirationTime <= currentTime) {
        throw new ResponseError(400, "Token expired")
    }

    return await User.update({
        where: { 
            id: decodedVerificationToken.id,
            verificationToken: token 
        },
        data: {
            verificationToken: null
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            position: true
        }
    })
}

module.exports = {
    register,
    verify
}