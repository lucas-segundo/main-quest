import { makeSubclassFinder } from 'app/useCases/subclasses/SubclassFinder/factory'
import { SubclassFinderController } from '.'

export const makeSubclassFinderController = (): SubclassFinderController => {
  const classFinder = makeSubclassFinder()

  return new SubclassFinderController(classFinder)
}
