import { PrismaFindClassRepository } from 'domain/entities/Class/repositories/FindClass/prisma'
import { ClassFinder } from '.'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino/factory'

export const makeClassFinder = (): ClassFinder => {
  const characterFindClassRepository = new PrismaFindClassRepository()
  const useCase = new ClassFinder(
    characterFindClassRepository,
    makeLogErrorRepository(),
  )

  return useCase
}
