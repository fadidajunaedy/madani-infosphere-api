const express = require("express")
const userController = require("../controller/user-controller.js")

const publicRouter = new express.Router()
publicRouter.post('/api/users/register', userController.register)

module.exports = publicRouter