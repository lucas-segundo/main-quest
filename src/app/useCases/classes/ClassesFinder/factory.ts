import { PrismaFindClassesRepository } from 'app/repositories/classes/FindClasses/prisma'
import { ClassesFinder } from '.'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/pino/factory'

export const makeClassesFinder = (): ClassesFinder => {
  const findClassesRepoRepo = new PrismaFindClassesRepository()
  const useCase = new ClassesFinder(
    findClassesRepoRepo,
    makeLogErrorRepository(),
  )

  return useCase
}
