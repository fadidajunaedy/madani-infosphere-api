const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity")

const registerUserValidation = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    position: Joi.string().required(),
    role: Joi.string().default("user"),
    isVerified: Joi.boolean().default(false),
    status: Joi.boolean().default(false)
})

const verifyEmailUserValidation = Joi.string().required()

const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: passwordComplexity().required()
})

const updateUserValidation = Joi.object({
    name: Joi.string().optional(),
    position: Joi.string().optional(),
})

const getUserValidation = Joi.number().required()

const changePasswordUserValidation = Joi.object({
    currentPassword: passwordComplexity().required(),
    newPassword: passwordComplexity().required()
})

const forgotPasswordValidation = Joi.string().email().required()

const resetPasswordUserValidation = Joi.object({
    userId: Joi.number().required(),
    token: Joi.string().required(),
    newPassword: passwordComplexity().required()
})

module.exports = {
    registerUserValidation,
    verifyEmailUserValidation,
    loginUserValidation,
    updateUserValidation,
    getUserValidation,
    changePasswordUserValidation,
    forgotPasswordValidation,
    resetPasswordUserValidation
}