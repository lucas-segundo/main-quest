import { SubclassFinder } from '.'
import { pinoLogger } from 'infra/pino'
import { PrismaSubclassFinderRepo } from 'app/repositories/subclasses/SubclassFinderRepo/prisma'
import { PinoLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino'

export const makeSubclassFinder = (): SubclassFinder => {
  const characterSubclassFinderRepo = new PrismaSubclassFinderRepo()
  const errorLoggerRepo = new PinoLogErrorRepository(pinoLogger)
  const useCase = new SubclassFinder(
    characterSubclassFinderRepo,
    errorLoggerRepo,
  )

  return useCase
}
