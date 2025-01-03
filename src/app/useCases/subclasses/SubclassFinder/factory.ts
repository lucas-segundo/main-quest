import { SubclassFinder } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaSubclassFinderRepo } from 'app/repositories/subclasses/SubclassFinderRepo/prisma'

export const makeSubclassFinder = (): SubclassFinder => {
  const characterSubclassFinderRepo = new PrismaSubclassFinderRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new SubclassFinder(
    characterSubclassFinderRepo,
    errorLoggerRepo,
  )

  return useCase
}
