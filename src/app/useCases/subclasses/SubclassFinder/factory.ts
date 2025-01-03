import { SubclassFinder } from '.'
import { pinoLogger } from 'infra/pino'
import { PrismaFindSubclasses } from 'app/repositories/subclasses/FindSubclasses/prisma'
import { PinoLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino'

export const makeSubclassFinder = (): SubclassFinder => {
  const characterFindSubclasses = new PrismaFindSubclasses()
  const errorLoggerRepo = new PinoLogErrorRepository(pinoLogger)
  const useCase = new SubclassFinder(characterFindSubclasses, errorLoggerRepo)

  return useCase
}
