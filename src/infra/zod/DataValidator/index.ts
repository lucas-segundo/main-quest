import {
  DataValidator,
  DataValidatorResult,
} from 'presentation/interfaces/DataValidator'
import { ZodError, ZodObject } from 'zod'
import { adaptZodError } from '../adapters/adaptZodError'

export class ZodDataValidator implements DataValidator {
  constructor(private readonly schema: ZodObject<any>) {}

  async validate(data: Record<string, any>): Promise<DataValidatorResult> {
    try {
      await this.schema.parseAsync(data)
      return { errors: [] }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = adaptZodError(error)
        return { errors }
      } else {
        throw error
      }
    }
  }
}
