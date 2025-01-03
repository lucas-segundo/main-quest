import { PrismaUpdateClassRepository } from 'app/repositories/classes/UpdateClass/prisma'
import { ClassUpdater } from '.'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassUpdater = (): ClassUpdater => {
  const classUpdaterRepo = new PrismaUpdateClassRepository()
  const useCase = new ClassUpdater(classUpdaterRepo, makeErrorLoggerRepo())

  return useCase
}
