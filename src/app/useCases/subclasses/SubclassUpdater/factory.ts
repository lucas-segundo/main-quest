import { SubclassUpdater } from '.'
import { PrismaSubclassUpdaterRepo } from 'app/repositories/subclasses/SubclassUpdaterRepo/prisma'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino/factory'

export const makeSubclassUpdater = (): SubclassUpdater => {
  const classUpdaterRepo = new PrismaSubclassUpdaterRepo()
  const useCase = new SubclassUpdater(
    classUpdaterRepo,
    makeLogErrorRepository(),
  )

  return useCase
}
