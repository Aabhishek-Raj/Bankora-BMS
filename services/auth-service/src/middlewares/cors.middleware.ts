import cors from 'cors'
import { config } from '../config'

export const corsMiddleware = cors({
  origin: [config.services.apiGatewayUrl, config.services.authServiceUrl],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
})
