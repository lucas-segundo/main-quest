import { SubclassCreater } from '.'
import { pinoLogger } from 'infra/pino'
import { PrismaSubclassCreaterRepo } from 'app/repositories/subclasses/SubclassCreaterRepo/prisma'
import { PinoLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino'

export const makeSubclassCreater = (): SubclassCreater => {
  const subclassCreaterRepo = new PrismaSubclassCreaterRepo()
  const errorLoggerRepo = new PinoLogErrorRepository(pinoLogger)
  const useCase = new SubclassCreater(subclassCreaterRepo, errorLoggerRepo)

  return useCase
}
