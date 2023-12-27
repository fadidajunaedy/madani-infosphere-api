const {
    createReportValidation,
    updateReportValidation,
    getReportValidation
} = require("../validation/report-validation.js")
const validate = require("../validation/validation.js")
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

    console.log(request)

    const createdReport = await Report.create({ data: request })

    return {
        ...createdReport,
        tags: createdReport.tags.split(';')
    }
}

module.exports = {
    create
}