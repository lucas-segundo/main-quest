import { FindSubclassController } from '.'
import { makeFindSubclassRepository } from 'app/repositories/subclasses/FindSubclass/factory'

export const makeFindSubclassController = (): FindSubclassController => {
  return new FindSubclassController(makeFindSubclassRepository())
}
