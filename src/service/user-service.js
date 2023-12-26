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
    generateEmailVerificationToken,
    generateResetPasswordToken
} = require("../util/generate-token.js")
const {
    sendEmailVerification, 
    sendEmailResetPassword
} = require("../util/send-mail.js")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const ResponseError = require("../error/response-error.js")
const prismaClient = require("../application/database.js")
const { request } = require("http")
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
            isVerified: true,
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

const login = async (request) => {
    request = validate(loginUserValidation, request)
    const user = await User.findUnique({ where: { email: request.email } })

    if (!user) {
        throw new ResponseError(401, "Email or password is wrong")
    }

    const hashedPassword = hashPassword(request.password)
    if (hashedPassword !== user.password) {
        throw new ResponseError(401, "Email or password is wrong")
    }

    if (!user.isVerified) {
        if (!user.verificationToken) {
            const verificationToken = await generateEmailVerificationToken(user)
            await User.update({ 
                where: {
                    id: user.id
                },
                data: {
                    verificationToken: verificationToken
                }
            })
            const url = `http://localhost:5173/auth/verify?${verificationToken}`
            await sendEmailVerification(user.email, url)
            throw new ResponseError(403, "A verification email has been sent to your email account, please verify.")
        }
        throw new ResponseError(403, "Please verify your email first")
    }

    if (!user.status) {
        throw new ResponseError(400, "Your account has not been or is not activated by admin")
    }

    const accessToken = await generateAccessToken(user)
    
    let refreshToken
    refreshToken = user.refreshToken
    if (!user.refreshToken) {
        const newRefreshToken = await generateRefreshToken(user)
        await User.update({ 
            where: {
                id: user.id
            },
            data: {
                refreshToken: newRefreshToken
            }
        })

        refreshToken = newRefreshToken
    }

    return { accessToken, refreshToken }
}

const update = async (user, request) => {
    request = validate(updateUserValidation, request)
    
    return await User.update({
        where: {
            id: user.id
        },
        data: request,
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            position: true
        }
    })
}

const get = async (user) => {
    const userData = await User.findUnique({ where: { id: user.id }})
    
    if (!userData) {
        throw new ResponseError(404, "User is not found")
    }

    return userData
}

const changePassword = async (user, request) => {
    request = validate(changePasswordUserValidation, request)

    const hashedPassword = hashPassword(request.currentPassword)
    if (hashedPassword !== user.password) {
        throw new ResponseError(401, "Current password is not match!")
    }

    const newPassword = hashPassword(request.newPassword)

    return await User.update({
        where: { id: user.id },
        data: {
            password: newPassword
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

const forgotPassword = async (email) => {
    email = validate(forgotPasswordValidation, email)

    const user = await User.findUnique({ where: { email: email } })
    if (!user) {
        throw new ResponseError(404, "Email is not found")
    }

    const resetToken = await generateResetPasswordToken(user)
    await User.update({
        where: {
            id: user.id
        },
        data: {
            resetPasswordToken: resetToken
        }
    })

    const resetURL = `http://localhost:5173/auth/reset-password/${resetToken}`
    await sendEmailResetPassword(user.email, resetURL)

    return
}


module.exports = {
    register,
    verify,
    login,
    update,
    get,
    changePassword,
    forgotPassword
}