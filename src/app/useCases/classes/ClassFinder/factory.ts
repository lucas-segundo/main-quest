import { ClassFinder } from '.'
import { PrismaClassFinderRepo } from 'app/repositories/classes/ClassFinderRepo/prisma'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassFinder = (): ClassFinder => {
  const characterClassFinderRepo = new PrismaClassFinderRepo()
  const useCase = new ClassFinder(
    characterClassFinderRepo,
    makeErrorLoggerRepo(),
  )

  return useCase
}
