import { makeFindClassesRepository } from 'app/repositories/classes/FindClasses/factory'
import { FindClassesController } from '.'

export const makeFindClassesController = (): FindClassesController => {
  return new FindClassesController(makeFindClassesRepository())
}
