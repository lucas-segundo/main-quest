export interface DataValidationResult {
  errors: string[]
}

export interface DataValidation {
  validate(data: Record<string, any>): Promise<DataValidationResult>
}
