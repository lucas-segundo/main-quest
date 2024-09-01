import { PrismaClassUpdaterRepo } from 'infra/prisma/repositories/classes/ClassUpdaterRepo'
import { ClassUpdater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'

export const makeClassUpdater = (): ClassUpdater => {
  const classUpdaterRepo = new PrismaClassUpdaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassUpdater(classUpdaterRepo, errorLoggerRepo)

  return useCase
}
