import { makeFindClassesRepository } from 'domain/entities/Class/repositories/FindClasses/factory'
import { FindClassesController } from '.'

export const makeFindClassesController = (): FindClassesController => {
  return new FindClassesController(makeFindClassesRepository())
}
