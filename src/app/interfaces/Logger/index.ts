export interface LoggerParams {
  level: 'info' | 'error' | 'warn'
  message: string
  stack?: string
}

export interface Logger {
  log(params: LoggerParams): void
}
