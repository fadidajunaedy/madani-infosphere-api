const Joi = require('joi')

const createReportValidation = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    file: Joi.any(),
    linkFile: Joi.any(),
    year: Joi.number().optional(),
    relatedProgram: Joi.string().optional(),
    createdUser: Joi.string().required()
})

const updateReportValidation = Joi.object({
    title: Joi.string().optional(),
    category: Joi.string().optional(),
    subcategory: Joi.string().optional(),
    description: Joi.string().optional(),
    file: Joi.string().optional(),
    linkFile: Joi.string().optional(),
    year: Joi.number().optional(),
    relatedProgram: Joi.string().optional()
})

const getReportValidation = Joi.number().required()

module.exports = {
    createReportValidation,
    updateReportValidation,
    getReportValidation
}