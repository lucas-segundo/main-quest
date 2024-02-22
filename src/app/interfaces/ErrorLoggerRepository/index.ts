export interface ErrorLoggerRepoParams {
  error: Error
}

export interface ErrorLoggerRepo {
  log(params: ErrorLoggerRepoParams): void
}
