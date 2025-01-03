import { PrismaFindClassesRepository } from 'app/repositories/classes/ClassesFinderRepo/prisma'
import { ClassesFinder } from '.'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassesFinder = (): ClassesFinder => {
  const classesFinderRepo = new PrismaFindClassesRepository()
  const useCase = new ClassesFinder(classesFinderRepo, makeErrorLoggerRepo())

  return useCase
}
