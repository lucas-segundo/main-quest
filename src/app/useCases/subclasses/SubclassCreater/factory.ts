import { SubclassCreater } from '.'
import { pinoLogger } from 'infra/pino'
import { PrismaCreateSubclassRepository } from 'app/repositories/subclasses/CreateSubclass/prisma'
import { PinoLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino'

export const makeSubclassCreater = (): SubclassCreater => {
  const subclassCreaterRepo = new PrismaCreateSubclassRepository()
  const errorLoggerRepo = new PinoLogErrorRepository(pinoLogger)
  const useCase = new SubclassCreater(subclassCreaterRepo, errorLoggerRepo)

  return useCase
}
