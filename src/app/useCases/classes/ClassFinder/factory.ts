import { PrismaClassFinderRepo } from 'infra/prisma/repositories/classes/ClassFinderRepo'
import { ClassFinder } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'

export const makeClassFinder = (): ClassFinder => {
  const characterClassFinderRepo = new PrismaClassFinderRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassFinder(characterClassFinderRepo, errorLoggerRepo)

  return useCase
}
