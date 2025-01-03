import { ClassesFinder } from '.'
import { PrismaClassesFinderRepo } from 'app/repositories/classes/ClassesFinderRepo/prisma'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassesFinder = (): ClassesFinder => {
  const classesFinderRepo = new PrismaClassesFinderRepo()
  const useCase = new ClassesFinder(classesFinderRepo, makeErrorLoggerRepo())

  return useCase
}
