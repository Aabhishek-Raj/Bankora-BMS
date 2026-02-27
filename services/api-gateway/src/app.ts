import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { config } from './config'
import { proxyServices } from './config/services'
import { limiter } from './middlewares/rateLimiter.middleware'
import logger from './config/logger'

const app = express()

app.use(helmet())
app.use(cors())
app.use(limiter)

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.debug(`${req.method} ${req.url}`)
  next()
})

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

proxyServices(app)

app.use((req: Request, res: Response) => {
  logger.warn('Resource not found', req.url)
  res.status(401).json({ message: 'Resource not found' })
})

app.use((err: Error, req: Request, res: Response) => {
  logger.error('Unhandled error:', err)
  res.status(500).json({ message: 'Internal server error' })
})

const startServer = () => {
  try {
    app.listen(config.service.port, () => {
      logger.info(`${config.service.name} running at port ${config.service.port}`)
    })
  } catch (err) {
    logger.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
