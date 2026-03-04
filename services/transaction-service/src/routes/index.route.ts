import { RequestHandler, Router } from 'express'
import { config } from '../config'

const indexRouter = Router()

const rootHandler: RequestHandler = (req, res) => {
  return res.json({ service: config.service.name, status: 'running' })
}

const healthHandler: RequestHandler = (req, res) => {
  return res.json({ service: config.service.name, status: 'ok' })
}

indexRouter.get('/', rootHandler)
indexRouter.get('/health', healthHandler)

export { indexRouter }
