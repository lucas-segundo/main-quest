import { PrismaSubclassCreaterRepo } from 'infra/prisma/repositories/subclasses/SubclassCreaterRepo'
import { SubclassCreater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'

export const makeSubclassCreater = (): SubclassCreater => {
  const subclassCreaterRepo = new PrismaSubclassCreaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new SubclassCreater(subclassCreaterRepo, errorLoggerRepo)

  return useCase
}
