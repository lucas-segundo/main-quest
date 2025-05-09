import { adaptZodError } from 'infra/zod/adaptZodError'
import {
  DataValidator,
  DataValidatorResult,
} from 'presentation/interfaces/DataValidator'
import { ZodError, ZodObject } from 'zod'

export class ZodDataValidator implements DataValidator {
  constructor(private readonly schema: ZodObject<any>) {}

  async validate(data: Record<string, any>): Promise<DataValidatorResult> {
    try {
      return await this.handleValidation(data)
    } catch (error) {
      return this.handleError(error)
    }
  }

  private async handleValidation(data: Record<string, any>) {
    await this.schema.parseAsync(data)
    return { errors: [] }
  }

  private handleError(error: ZodError): DataValidatorResult {
    if (error instanceof ZodError) {
      const validationErrors = adaptZodError(error)
      return { errors: validationErrors }
    } else {
      throw error
    }
  }
}
