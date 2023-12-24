const  express = require("express")
import {errorMiddleware} from "../middleware/error-middleware.js";

const web = express()

web.use(express.json())

web.use(errorMiddleware)

module.exports = { web }