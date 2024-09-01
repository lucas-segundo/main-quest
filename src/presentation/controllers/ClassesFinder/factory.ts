import { ClassesFinderController } from '.'
import { makeClassesFinder } from 'app/useCases/classes/ClassesFinder/factory'

export const makeClassesFinderController = (): ClassesFinderController => {
  const classFinder = makeClassesFinder()

  return new ClassesFinderController(classFinder)
}
