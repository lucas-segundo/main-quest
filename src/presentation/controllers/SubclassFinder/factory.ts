import { makeSubclassFinder } from 'app/useCases/SubclassFinder/factory'
import { SubclassFinderController } from '.'

export const makeSubclassFinderController = (): SubclassFinderController => {
  const classFinder = makeSubclassFinder()

  return new SubclassFinderController(classFinder)
}
