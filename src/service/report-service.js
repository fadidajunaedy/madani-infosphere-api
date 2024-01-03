const {
    createReportValidation,
    updateReportValidation,
    getReportValidation
} = require("../validation/report-validation.js")
const validate = require("../validation/validation.js")
const fs = require("fs")
const ResponseError = require("../error/response-error.js")
const prismaClient = require("../application/database.js")
const Report = prismaClient.report

const create = async (request) => {
    request = validate(createReportValidation, request)
    const arrayToStringTags = request.tags.join(";")
    request.tags = arrayToStringTags

    if (!request.file && !request.linkFile) {
        throw new ResponseError(400, "One of the file or linkFile must be filled")
    }

    const createdReport = await Report.create({ data: request })

    return {
        ...createdReport,
        tags: createdReport.tags.split(';')
    }
}

const update = async (user, id, request) => {
    id = validate(getReportValidation, id)
    request = validate(updateReportValidation, request)

    const report = await Report.findUnique({ where: { id: id } })
    if (!report) {
        throw new ResponseError(404, "Report is not found")
    }

    if ((!(user.username === report.createdUser || user.role === "admin" || user.role === "super-admin"))) {
        throw new ResponseError(403, "You cannot edit this report")
    }

    if (request.file && request.linkFile) {
        throw new ResponseError(400, "You can only update either 'file' or 'linkFile', not both");
    }

    if (request.file) {
        if (!report.file) {
            request.file = null
        }
    }

    if (request.linkFile) {
        if (!report.linkFile) {
            request.linkFile = null
        }
    }

    if (request.file && report.file) {
        fs.unlink(`src/files/${report.category}/${report.file}`, (err) => {
            if (err) {
                console.error('Error deleting previous file:', err)
            }
            console.log('Previous file deleted, insert new file');
        })
    }   

    return await Report.update({
        where: {
            id: id
        },
        data: request
    })
}

const get = async (id) => {
    id = validate(getReportValidation, id)

    const report = await Report.findUnique({ where: { id: id } })
    if (!report) {
        throw new ResponseError(404, "Report is not found")
    }

    return report
}

const getAll = async () => {
    const report = await Report.findMany({})

    if (!report) {
        throw new ResponseError(404, "Report is not found")
    }

    return report
}

const remove = async (user, id) => {
    id = validate(getReportValidation, id)

    const report = await Report.findUnique({ where: { id: id } })
    if (!report) {
        throw new ResponseError(404, "Report is not found")
    }

    if ((!(user.username === report.createdUser || user.role === "admin" || user.role === "super-admin"))) {
        throw new ResponseError(403, "You cannot remove this report")
    }

    return await Report.delete({ where: { id: id } })
}


module.exports = {
    create,
    update,
    get,
    getAll,
    remove
}