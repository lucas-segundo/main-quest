import { PrismaFindClassRepository } from 'app/repositories/classes/ClassFinderRepo/prisma'
import { ClassFinder } from '.'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassFinder = (): ClassFinder => {
  const characterFindClassRepository = new PrismaFindClassRepository()
  const useCase = new ClassFinder(
    characterFindClassRepository,
    makeErrorLoggerRepo(),
  )

  return useCase
}
