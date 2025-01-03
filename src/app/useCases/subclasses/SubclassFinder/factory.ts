import { SubclassFinder } from '.'
import { pinoLogger } from 'infra/pino'
import { PrismaSubclassFinderRepo } from 'app/repositories/subclasses/SubclassFinderRepo/prisma'
import { PinoErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino'

export const makeSubclassFinder = (): SubclassFinder => {
  const characterSubclassFinderRepo = new PrismaSubclassFinderRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new SubclassFinder(
    characterSubclassFinderRepo,
    errorLoggerRepo,
  )

  return useCase
}
