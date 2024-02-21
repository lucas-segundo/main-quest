export interface LoggerRepoParams {
  level: 'info' | 'error' | 'warn'
  message: string
  error?: Error
}

export interface LoggerRepo {
  log(params: LoggerRepoParams): void
}
