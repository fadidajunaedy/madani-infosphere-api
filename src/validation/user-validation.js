const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity")

const registerUserValidation = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    position: Joi.string().required()
})


const verifyEmailUserValidation = Joi.string().required()

const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: passwordComplexity().required()
})

// user
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
    token: Joi.string().required(),
    newPassword: passwordComplexity().required()
})

// admin
const createUserValidation = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    position: Joi.string().required(),
    isVerified: Joi.boolean().default(false),
    status: Joi.boolean().default(false)
})

// admin
const updateByIdUserValidation = Joi.object({
    name: Joi.string().optional(),
    password: passwordComplexity().optional(),
    position: Joi.string().optional(),
    isVerified: Joi.boolean().optional(),
    status: Joi.boolean().optional()
})

module.exports = {
    registerUserValidation,
    verifyEmailUserValidation,
    loginUserValidation,
    updateUserValidation,
    getUserValidation,
    changePasswordUserValidation,
    forgotPasswordValidation,
    resetPasswordUserValidation,
    createUserValidation,
    updateByIdUserValidation
}