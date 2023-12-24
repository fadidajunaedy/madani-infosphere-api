const winston = require("winston")
const path = require("path")

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join('logs', 'error.log'), level: 'error', timestamp: true }),
        new winston.transports.File({ filename: path.join('logs', 'info.log'), level: 'info', timestamp: true }),
        new winston.transports.File({ filename: path.join('logs', 'combined.log'), timestamp: true }),
    ]
})

module.exports = { logger }