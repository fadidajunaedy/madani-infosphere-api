const {
    registerUserValidation,
    verifyEmailUserValidation,
    loginUserValidation,
    updateUserValidation,
    getUserValidation,
    changePasswordUserValidation,
    forgotPasswordValidation,
    resetPasswordUserValidation,
    createUserValidation,
    updateByIdUserValidation,
    refreshTokenValidation
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
const ResponseError = require("../error/response-error.js")
const prismaClient = require("../application/database.js")
const User = prismaClient.user

const register = async (request) => {
    request= validate(registerUserValidation, request)
    
    const usernameExist = await User.findFirst({ where: { username: request.username }})
    if (usernameExist) {
        throw new ResponseError(400, "Username already registered")
    }

    const emailExist = await User.findFirst({ where: { email: request.email }})
    if (emailExist) {
        throw new ResponseError(400, "Email already registered")
    }
    
    request.password = hashPassword(request.password)
    
    const newUser = await User.create({
        data: request,
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
        }
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

const resetPassword = async (request) => {
    request = validate(resetPasswordUserValidation, request)

    const checkToken = User.findFirst({ where: { resetPasswordToken: request.token } })
    if (!checkToken) {
        throw new ResponseError(404, "Invalid token")
    }

    const decodedResetPasswordToken = jwt.verify(request.token, process.env.SECRET_KEY)
    const hashedPassword = hashPassword(request.newPassword)

    return await User.update({
        where: {
            id: decodedResetPasswordToken.id,
            resetPasswordToken: request.token            
        },
        data: {
            password: hashedPassword,
            resetPasswordToken: null
        }
    })
}

const create = async (request) => {
    request= validate(createUserValidation, request)
    
    const usernameExist = await User.findFirst({ where: { username: request.username }})
    if (usernameExist) {
        throw new ResponseError(400, "Username already registered")
    }

    const emailExist = await User.findFirst({ where: { email: request.email }})
    if (emailExist) {
        throw new ResponseError(400, "Email already registered")
    }
    
    request.password = hashPassword(request.password)
    
    const newUser = await User.create({ data: request })

    if (!newUser.isVerified) {
        const verificationToken = await generateEmailVerificationToken(newUser)
        
        const userWithVerificationToken = await User.update({
            where: { id: newUser.id },
            data: {
                verificationToken: verificationToken
            }
        })
        const url = `http://localhost:5173/auth/verify?${userWithVerificationToken.verificationToken}`
        await sendEmailVerification(userWithVerificationToken.email, url)
    }

    return newUser
}

const updateById = async (id, request) => {
    id = validate(getUserValidation, id)
    request = validate(updateByIdUserValidation, request)
    console.log(id)
    if (request.password) {
        request.password = hashPassword(request.password)
    }

    return await User.update({
        where: {
            id: id
        },
        data: request
    })
}

const getById = async (id) => {
    id = validate(getUserValidation, id)
    const user = await User.findUnique({ 
        where: { 
            id: id,
            role: "user"
        }
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user
}

const getAll = async () => {
    const user = await User.findMany({})

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user
}

const remove = async (id) => {
    id = validate(getUserValidation, id)
    const user = await User.findUnique({ 
        where: { 
            id: id,
            role: "user"
        }
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return await User.delete({ where: { id: id } })
}

const refreshAccessToken = async (refreshToken) => {
    refreshToken = validate(refreshTokenValidation, refreshToken)

    const user = await User.findFirst({ where: { refreshToken: refreshToken } })
    if (!user) {
        throw new ResponseError(401, "Invalid token")
    }

    const newAccessToken = await generateAccessToken(user)
    return newAccessToken
}


module.exports = {
    register,
    verify,
    login,
    update,
    get,
    changePassword,
    forgotPassword,
    resetPassword,
    create,
    updateById,
    getById,
    getAll,
    remove,
    refreshAccessToken
}