import { ClassUpdater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaClassUpdaterRepo } from 'app/repositories/classes/ClassUpdaterRepo/prisma'

export const makeClassUpdater = (): ClassUpdater => {
  const classUpdaterRepo = new PrismaClassUpdaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassUpdater(classUpdaterRepo, errorLoggerRepo)

  return useCase
}
