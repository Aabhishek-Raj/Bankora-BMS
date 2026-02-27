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
    logLevel: string
    databaseUrl: string
    jwtSecret: string
    jwtExpiresIn: string
    redisUrl: string
  }
  services: {
    authServiceUrl: string
    apiGatewayUrl: string
  }
}

export const config: Config = {
  service: {
    name: getEnv('SERVICE_NAME', 'auth-service'),
    port: Number(getEnv('PORT', 3001)),
    nodeEnv: getEnv('NODE_ENV', 'development'),
    logLevel: getEnv('LOG_LEVEL', 'info'),
    databaseUrl: getEnv('DATABASE_URL'),
    jwtSecret: getEnv('JWT_SECRET'),
    jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '24h'),
    redisUrl: getEnv('REDIS_URL'),
  },
  services: {
    authServiceUrl: getEnv('AUTH_SERVICE_URL', 'http://localhost:3001'),
    apiGatewayUrl: getEnv('API_GATEWAY_URL', 'http://localhost:3000'),
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
