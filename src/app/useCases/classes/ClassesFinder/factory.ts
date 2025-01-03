import { PrismaFindClassesRepository } from 'app/repositories/classes/FindClasses/prisma'
import { ClassesFinder } from '.'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino/factory'

export const makeClassesFinder = (): ClassesFinder => {
  const classesFinderRepo = new PrismaFindClassesRepository()
  const useCase = new ClassesFinder(classesFinderRepo, makeLogErrorRepository())

  return useCase
}
