import rateLimit from 'express-rate-limit'
import { config } from '../config'

export const limiter = rateLimit({
  skip: (_req, _res) => {
    return config.service.nodeEnv !== 'production'
  },
  windowMs: 15 * 60 * 1000,
  max: 100,
})
