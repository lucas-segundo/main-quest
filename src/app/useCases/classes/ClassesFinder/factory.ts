import { ClassesFinder } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaClassesFinderRepo } from 'infra/prisma/repositories/classes/ClassesFinderRepo'

export const makeClassesFinder = (): ClassesFinder => {
  const classesFinderRepo = new PrismaClassesFinderRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassesFinder(classesFinderRepo, errorLoggerRepo)

  return useCase
}
