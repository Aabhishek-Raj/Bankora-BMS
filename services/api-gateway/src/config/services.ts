import { Application } from 'express'
import { createProxyMiddleware, Options } from 'http-proxy-middleware'
import { config } from '../config'
import logger from './logger'
import { ProxyErrorResponse, ServiceConfig } from '../types/intex'

class ProxyServices {
  private static readonly services: ServiceConfig[] = [
    {
      route: '/api/v1/auth',
      target: config.services.authServiceUrl,
      pathRewrite: { '^/': '/api/v1/auth/' },
      name: 'auth-service',
    },
  ]

  private static createProxyOptions(service: ServiceConfig): Options {
    return {
      target: service.target,
      changeOrigin: true,
      timeout: service.timeout ?? config.service.defaultTimeout,
      pathRewrite: service.pathRewrite,
      logger: logger,
      // pathRewrite: {
      //     [`^${service.route}`]: ''
      // },
      on: {
        error: this.handleProxyError,
      },
    }
  }
  private static handleProxyError(err: Error, req: any, res: any): void {
    logger.error(`Proxy error for ${req.path}:`, err)

    const errorResponse: ProxyErrorResponse = {
      message: 'Service unavailable',
      status: 503,
      timestamp: new Date().toISOString(),
    }

    res.status(503).setHeader('Content-Type', 'application/json').end(JSON.stringify(errorResponse))
  }

  public static createProxy(app: Application) {
    this.services.forEach((service) => {
      const proxyOptions = this.createProxyOptions(service)
      app.use(service.route, createProxyMiddleware(proxyOptions))
      logger.info(`Configured proxy for ${service.name} at ${service.route}`)
    })
  }
}

export const proxyServices = (app: Application): void => {
  ProxyServices.createProxy(app)
}
