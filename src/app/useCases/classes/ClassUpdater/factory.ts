import { PrismaUpdateClassRepository } from 'app/repositories/classes/UpdateClass/prisma'
import { ClassUpdater } from '.'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino/factory'

export const makeClassUpdater = (): ClassUpdater => {
  const classUpdaterRepo = new PrismaUpdateClassRepository()
  const useCase = new ClassUpdater(classUpdaterRepo, makeLogErrorRepository())

  return useCase
}
