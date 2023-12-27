const multer = require('multer')
const reportService = require("../service/report-service.js")

const create = async (req, res, next) => {
    try {
        const request = req.body
        request.createdUser = req.user.username
        if (req.file && req.file.filename) {
            request.file = req.file.filename
        }
        const result = await reportService.create(request)
        res.status(200).json({
            success: true,
            message: "Create report successfully",
            data: result
        })
    } catch(e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const request = req.body
        const result = await reportService.update(id, request)
        res.status(200).json({
            success: true,
            message: "Update report successfully",
            data: result
        })
    } catch(e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        
    } catch(e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        
    } catch(e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        
    } catch(e) {
        next(e)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let category = req.body.category
        let dir = `src/files/${category}/`
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
  
const upload = multer({
    storage: storage,
    limits:{fileSize: 20000000},
}).single("file")

module.exports = {
    create,
    update,
    get,
    getAll,
    remove,
    upload
}