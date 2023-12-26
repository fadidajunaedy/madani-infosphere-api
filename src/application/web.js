const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const { publicRouter } = require("../route/public-api.js")
const { privateRouter } = require("../route/api.js")
const errorMiddleware = require("../middleware/error-middleware.js")
const { config } = require("dotenv")

config()

const web = express()

web.use(cookieParser())
web.use(express.json())
web.use(express.urlencoded({ extended: true }))
web.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
)

web.use(publicRouter)
web.use(privateRouter)

web.use(errorMiddleware)

module.exports = web