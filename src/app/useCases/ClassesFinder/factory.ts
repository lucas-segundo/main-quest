import { ClassesFinder } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaClassesFinderRepo } from 'infra/prisma/repositories/ClassesFinderRepo'

export const makeClassesCreater = (): ClassesFinder => {
  const classesCreaterRepo = new PrismaClassesFinderRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassesFinder(classesCreaterRepo, errorLoggerRepo)

  return useCase
}
