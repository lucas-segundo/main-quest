import { SubclassCreater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaSubclassCreaterRepo } from 'app/repositories/subclasses/SubclassCreaterRepo/prisma'

export const makeSubclassCreater = (): SubclassCreater => {
  const subclassCreaterRepo = new PrismaSubclassCreaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new SubclassCreater(subclassCreaterRepo, errorLoggerRepo)

  return useCase
}
