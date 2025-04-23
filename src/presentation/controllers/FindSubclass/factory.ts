import { makeFindSubclassRepository } from 'domain/entities/Subclass/repositories/FindSubclass/factory'
import { FindSubclassController } from '.'

export const makeFindSubclassController = (): FindSubclassController => {
  return new FindSubclassController(makeFindSubclassRepository())
}
