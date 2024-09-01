import { makeClassFinder } from 'app/useCases/classes/ClassFinder/factory'
import { ClassFinderController } from '.'

export const makeClassFinderController = (): ClassFinderController => {
  const classFinder = makeClassFinder()

  return new ClassFinderController(classFinder)
}
