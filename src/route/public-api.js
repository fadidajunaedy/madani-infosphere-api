const express = require("express")
const userController = require("../controller/user-controller.js")

const publicRouter = new express.Router()

publicRouter.post('/api/users/register', userController.register)
publicRouter.patch('/api/users/verify/:token', userController.verify)
publicRouter.post('/api/users/login', userController.login)
publicRouter.post('/api/users/forgot-password', userController.forgotPassword)

module.exports = { publicRouter }