const express = require("express")
const authMiddleware = require("../middleware/auth-middleware.js")
const userController = require("../controller/user-controller.js")

const privateRouter = new express.Router()

privateRouter.use(authMiddleware)

privateRouter.patch('/api/users/me', userController.update)
privateRouter.get('/api/users/me', userController.get)
privateRouter.delete('/api/users/logout', userController.logout)

module.exports = { privateRouter }