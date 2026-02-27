import dotenv from 'dotenv'
const env = dotenv.config()

if (env.error) {
  console.error('.env file not found!')
  throw new Error('.env file not found!')
}

interface Config {
  service: {
    name: string
    port: number
    nodeEnv: string
    defaultTimeout: number
    logLevel: string
  }
  services: {
    authServiceUrl: string
    accountsServiceUrl: string
    transactionServiceUrl: string
  }
}

export const config: Config = {
  service: {
    name: getEnv('SERVICE_NAME', 'api-gateway'),
    port: Number(getEnv('PORT', 3000)),
    nodeEnv: getEnv('NODE_ENV', 'development'),
    defaultTimeout: getEnv('DEFAULT_TIMEOUT', 5000),
    logLevel: getEnv('LOG_LEVEL', 'info'),
  },
  services: {
    authServiceUrl: getEnv('AUTH_SERVICE_URL', 'http://localhost:3001'),
    accountsServiceUrl: getEnv('ACCOUNTS_SERVICE_URL', 'http://localhost:3002'),
    transactionServiceUrl: getEnv('TRANSACTION_SERVICE_URL', 'http://localhost:3003'),
  },
}

function getEnv<T>(name: string, fallback?: T): T {
  const value = process.env[name]
  if (!value) {
    if (fallback !== undefined) {
      console.warn(`env variable ${name} is not set. Using fallback: ${fallback}`)
      return fallback
    }
    console.error(`Missing env variable ${name}`)
    throw new Error(`Missing env variable ${name}`)
  }
  if (typeof fallback === 'number') {
    return Number(value) as T
  }

  if (typeof fallback === 'boolean') {
    return (value === 'true' || value === '1') as T
  }

  return value as T
}
