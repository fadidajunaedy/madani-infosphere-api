const crypto = require("crypto")

const hashPassword = (password) => {
    const hash = crypto.createHash('sha512')
    return hash.update(password, 'utf-8').digest('hex')
}

module.exports = hashPassword