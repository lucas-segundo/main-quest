export interface LogErrorServiceParams {
  error: Error
}

export interface LogErrorService {
  log(params: LogErrorServiceParams): void
}
