const  express = require("express")
const { errorMiddleware } = require("../middleware/error-middleware.js")

const web = express()

web.use(express.json())

web.use(errorMiddleware)

module.exports = { web }