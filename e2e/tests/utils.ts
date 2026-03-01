import request from 'supertest'
import { config } from "./config"
import { AccountType, LoginUserType, UserType } from './types'

export const getTestUser = (): UserType => ({
  firstName: "Test",
  lastName: "User",
  email: `johnDoe-@${Date.now()}.com`,
  password: `password123${Date.now()}`,
})

export const testState = {
  authToken: "",
  currentTestUser: getTestUser(),
  accounts: [] as AccountType[]
};

export const apiGateway = request(config.apiGatewayUrl)
export const authService = request(config.authServiceUrl)

export async function registerUser(user: UserType) {
    return apiGateway.post('/api/v1/auth/register').send(user)
}

export async function loginUser(loginData: LoginUserType) {
  const response = await apiGateway.post("/api/v1/auth/login").send(loginData)

  if (response.status === 200 && response.body.token) {
    testState.authToken = response.body.token
  }
  return response
}

export async function cleanupResources() {
  for (const account of testState.accounts) {
    try {
      await apiGateway
        .delete(`/api/v1/accounts/${account.accountNumber}`)
        .set("Authorization", `Bearer ${testState.authToken}`)
    } catch (error) {
      console.error(
        `Failed to delete account ${account.accountNumber}:`,
        error
      );
    }
  }
}