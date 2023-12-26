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

const update = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await userService.update(user, request)
        res.status(200).json({
            success: true,
            message: "User Update Successfully",
            data: result
        })
    } catch(e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const result = await userService.get(user)
        res.status(200).json({
            success: true,
            message: "Get User Successfully",
            data: result
        })
    } catch(e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({
            success: true,
            message: "Logout Successfully",
            data: "OK"
        });
    } catch (e) {
         next(e)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await userService.changePassword(user, request)
        res.status(200).json({
            success: true,
            message: "Change password successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email
        await userService.forgotPassword(email)
        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully"
        })
    } catch (e) {
        next(e)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const request = req.body
        await userService.resetPassword(request)
        res.status(200).json({
            success: true,
            message: "Reset password successfully"
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    register,
    verify,
    login,
    update,
    get,
    logout,
    changePassword,
    forgotPassword,
    resetPassword
}