export interface ServiceConfig {
  route: string
  target: string
  pathRewrite: Record<string, string>
  name: string
  timeout?: number
}

export interface ProxyErrorResponse {
  message: string
  status: number
  timestamp: string
}
