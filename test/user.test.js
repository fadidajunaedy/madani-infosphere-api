import supertest from 'supertest'
import web from "../src/application/web.js"
import logger from "../src/application/logging.js"
const hashPassword = require("../src/util/hash-password.js")
const {
    createTestUser,
    getTestUser,
    removeTestUser
} = require("./test-util.js")

describe('POST /api/users/register', function () {
    afterEach(async () => {
        await removeTestUser()
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users/register')
            .send({
                name: "test",
                username: "test",
                email: "test@gmail.com",
                position: "TEST",
                password: "Rahasia123-"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()
    })

    it("should reject if password doesn't have complexity", async () => {
        const result = await supertest(web)
            .post('/api/users/register')
            .send({
                name: "test",
                username: "test",
                email: "test@gmail.com",
                position: "TEST",
                password: "rahasia"
            });

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
    
    it("should reject if password doesn't have complexity", async () => {
        const result = await supertest(web)
            .post('/api/users/register')
            .send({
                name: "test",
                username: "test",
                email: "test@gmail.com",
                position: "TEST",
                password: "rahasia"
            });

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if username of email already registered', async () => {
        const addNewUser = await supertest(web)
            .post('/api/users/register')
            .send({
                name: "test",
                username: "test",
                email: "test@gmail.com",
                position: "TEST",
                password: "Rahasia123-"
            })

        expect(addNewUser.status).toBe(200)
        expect(addNewUser.body.data.username).toBe("test")
        expect(addNewUser.body.data.name).toBe("test")
        expect(addNewUser.body.data.password).toBeUndefined()

        const addDuplicateUser = await supertest(web)
            .post('/api/users/register')
            .send({
                name: "test",
                username: "test",
                email: "test@gmail.com",
                position: "TEST",
                password: "Rahasia123-"
            })

        expect(addDuplicateUser.status).toBe(400)
        expect(addDuplicateUser.body.errors).toBeDefined()
    })
})