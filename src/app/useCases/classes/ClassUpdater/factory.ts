import { ClassUpdater } from '.'
import { PrismaClassUpdaterRepo } from 'app/repositories/classes/ClassUpdaterRepo/prisma'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassUpdater = (): ClassUpdater => {
  const classUpdaterRepo = new PrismaClassUpdaterRepo()
  const useCase = new ClassUpdater(classUpdaterRepo, makeErrorLoggerRepo())

  return useCase
}
