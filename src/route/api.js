const express = require("express")
const authMiddleware = require("../middleware/auth-middleware.js")
const adminMiddleware = require("../middleware/admin-middleware.js")
const userController = require("../controller/user-controller.js")

const privateRouter = new express.Router()

privateRouter.use(authMiddleware)

privateRouter.patch('/api/users/me', userController.update)
privateRouter.get('/api/users/me', userController.get)
privateRouter.post('/api/users/change-password', userController.changePassword)
privateRouter.delete('/api/users/logout', userController.logout)

privateRouter.post('/api/users/refresh-token', userController.refreshAccessToken)

privateRouter.post('/api/users', adminMiddleware, userController.create)
privateRouter.patch('/api/users/:id', adminMiddleware, userController.updateById)
privateRouter.get('/api/users', adminMiddleware, userController.getAll)
privateRouter.get('/api/users/:id', adminMiddleware, userController.getById)
privateRouter.delete('/api/users/:id', adminMiddleware, userController.remove)

module.exports = { privateRouter }