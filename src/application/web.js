const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const { errorMiddleware } = require("../middleware/error-middleware.js")

const web = express()

web.use(express.json())
web.use(cookieParser())
web.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
)
web.use(errorMiddleware)

module.exports = web