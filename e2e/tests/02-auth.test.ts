import { apiGateway, loginUser, registerUser, testState } from "./utils"


describe('Auth service test', () => {
    const currentTestUser = testState.currentTestUser

    test('User registration should give 201 created', async () => {
        const response = await registerUser(currentTestUser)

        expect(response.status).toBe(201)
        expect(response.body.email).toBe(currentTestUser.email)
    })

    test("Registration with existing email should return 400", async () => {
        const response = await registerUser(currentTestUser)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("email already in use")
    })

    test("User login should return 200 OK and a token", async () => {
        const response = await loginUser({
                email: currentTestUser.email,
                password: currentTestUser.password
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
        expect(typeof response.body.token).toBe("string")
        expect(response.body.token).not.toBe("")
        expect(testState.authToken).not.toBe("")
    })

    test("Login with invalid credentials should return 401 Unauthorized", async () => {
        const response = await apiGateway.post("/api/v1/auth/login").send({
                email: currentTestUser.email,
                password: "wrongPassword"
            })

        expect(response.status).toBe(401)
        expect(response.body.message).toBe("invalid credentials")
    })

    test("User logout should return 200 OK", async () => {
        const response = await apiGateway.post("/api/v1/auth/logout")
            .set("Authorization", `Bearer ${testState.authToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBe("logged out successfully")
        testState.authToken = ""
    });

})