import { FindClassController } from '.'
import { makeFindClassRepository } from 'app/repositories/classes/FindClass/factory'

export const makeFindClassController = (): FindClassController => {
  return new FindClassController(makeFindClassRepository())
}
