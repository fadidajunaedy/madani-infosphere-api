const prismaClient = require("../src/application/database.js")
const hashPassword = require("../src/util/hash-password.js")

const createTestUser = async () => {
    await User.create({
        data: {
            name: "test",
            username: "test",
            email: "test@gmail.com",
            position: "TEST",
            password: hashPassword('Rahasia123-')
        }
    })
}

const getTestUser = async () => {
    return User.findUnique({
        where: {
            username: "test"
        }
    })
}

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

module.exports = {
    createTestUser,
    getTestUser,
    removeTestUser
}