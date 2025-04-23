import { FindClassController } from '.'
import { makeFindClassRepository } from 'domain/entities/Class/repositories/FindClass/factory'

export const makeFindClassController = (): FindClassController => {
  return new FindClassController(makeFindClassRepository())
}
