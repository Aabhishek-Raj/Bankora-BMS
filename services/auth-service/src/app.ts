import express from 'express'
import helmet from 'helmet'

// import { verifyToken } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware'
import { corsMiddleware } from './middlewares/cors.middleware'
import { reqLogger } from './middlewares/req.middleware'

import { AppDataSource } from './data-source'
import { config } from './config'
import { authRouter, indexRouter } from './routes'
import { verifyToken } from './middlewares/auth.middleware'
import { setupGracefulShutdown } from './utils/shutdown'
import logger from './config/logger'
// import init from './init'

const app = express()

app.use(helmet())
app.use(corsMiddleware)

app.use(reqLogger)
app.use(express.json())
app.use(verifyToken)

app.use(indexRouter)
app.use('/api/v1/auth', authRouter)

app.use(errorHandler)

AppDataSource.initialize()
  .then(async () => {
    // await init();

    const server = app.listen(config.service.port, () => {
      logger.info(`${config.service.name} is running on http://localhost:${config.service.port}`)
    })

    setupGracefulShutdown(server)
  })
  .catch((err) => {
    logger.error('error during Data Source initialization', err)
  })
