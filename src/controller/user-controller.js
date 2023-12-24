const userService = require("../service/user-service.js")

const register = async (req, res, next) => {
    try {
        const request = req.body
        const result = await userService.register(request)
        res.status(200).json({
            success: true,
            message: "User Register Successfully",
            data: {
                result
            }
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    register
}