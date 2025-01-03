import { SubclassUpdater } from '.'
import { PrismaUpdateSubclassRepository } from 'app/repositories/subclasses/UpdateSubclassRepository/prisma'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino/factory'

export const makeSubclassUpdater = (): SubclassUpdater => {
  const classUpdaterRepo = new PrismaUpdateSubclassRepository()
  const useCase = new SubclassUpdater(
    classUpdaterRepo,
    makeLogErrorRepository(),
  )

  return useCase
}
