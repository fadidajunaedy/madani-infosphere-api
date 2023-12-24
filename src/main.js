const web = require("./application/web.js")
const { logger } = require("./application/logging.js")

web.listen(3000, () => {
    logger.info("App start")
})