const userService = require("../service/user-service.js")

const register = async (req, res, next) => {
    try {
        const request = req.body
        const result = await userService.register(request)
        res.status(200).json({
            success: true,
            message: "User Register Successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const verify = async (req, res, next) => {
    try {
        const token = req.params.token
        const result = await userService.verify(token)
        res.status(200).json({
            success: true,
            message: "User Verification Successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body
        const result = await userService.login(request)

        res.cookie('accessToken', result.accessToken, { 
            sameSite: 'strict',
            maxAge: 180 * 60 * 1000, // 180 menit dalam milidetik
            httpOnly: true,
            withCredentials: true, 
        })
        
        res.cookie('refreshToken', result.refreshToken, { 
            sameSite: 'strict',
            maxAge: 90 * 24 * 60 * 60 * 1000, // 90 hari dalam milidetik
            httpOnly: true,
            withCredentials: true, 
        })

        res.status(200).json({
            success: true,
            message: "User Login Successfully"
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    register,
    verify,
    login
}