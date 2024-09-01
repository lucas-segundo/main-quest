import { SubclassUpdater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaSubclassUpdaterRepo } from 'infra/prisma/repositories/SubclassUpdaterRepo'

export const makeSubclassUpdater = (): SubclassUpdater => {
  const classUpdaterRepo = new PrismaSubclassUpdaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new SubclassUpdater(classUpdaterRepo, errorLoggerRepo)

  return useCase
}
