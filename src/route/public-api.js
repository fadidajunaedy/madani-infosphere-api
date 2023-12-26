const express = require("express")
const userController = require("../controller/user-controller.js")

const publicRouter = new express.Router()
publicRouter.get('/api/test', (req, res) => {
    res.status(200).json({ message: "test success" })
})
publicRouter.post('/api/users/register', userController.register)

module.exports = { publicRouter }