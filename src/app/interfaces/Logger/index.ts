export interface LoggerParams {
  level: 'info' | 'error' | 'warn'
  message: string
  error?: Error
}

export interface Logger {
  log(params: LoggerParams): void
}
