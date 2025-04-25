export interface LogErrorRepositoryParams {
  error: Error
}

export interface LogErrorRepository {
  log(params: LogErrorRepositoryParams): void
}
