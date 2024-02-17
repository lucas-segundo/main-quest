export interface DataValidatorResult {
  errors: string[]
}

export interface DataValidator {
  validate(data: Record<string, any>): Promise<DataValidatorResult>
}
