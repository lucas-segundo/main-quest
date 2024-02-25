import {
  DataValidator,
  DataValidatorResult,
} from 'presentation/interfaces/DataValidator'
import { ZodObject } from 'zod'

export class ZodDataValidator implements DataValidator {
  constructor(private readonly schema: ZodObject<any>) {}

  async validate(data: Record<string, any>): Promise<DataValidatorResult> {
    await this.schema.parseAsync(data)
    return Promise.resolve({ errors: [] })
  }
}
