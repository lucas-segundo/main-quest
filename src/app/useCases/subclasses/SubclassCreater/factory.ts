import { SubclassCreater } from '.'
import { pinoLogger } from 'infra/pino'
import { PrismaSubclassCreaterRepo } from 'app/repositories/subclasses/SubclassCreaterRepo/prisma'
import { PinoErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino'

export const makeSubclassCreater = (): SubclassCreater => {
  const subclassCreaterRepo = new PrismaSubclassCreaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new SubclassCreater(subclassCreaterRepo, errorLoggerRepo)

  return useCase
}
