export interface DataValidationError {
  errors: string[]
}

export interface DataValidation {
  validate(data: Record<string, any>): Promise<DataValidationError>
}
