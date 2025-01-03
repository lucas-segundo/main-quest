import { SubclassUpdater } from '.'
import { PrismaSubclassUpdaterRepo } from 'app/repositories/subclasses/SubclassUpdaterRepo/prisma'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeSubclassUpdater = (): SubclassUpdater => {
  const classUpdaterRepo = new PrismaSubclassUpdaterRepo()
  const useCase = new SubclassUpdater(classUpdaterRepo, makeErrorLoggerRepo())

  return useCase
}
