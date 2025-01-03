import { ClassFinder } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaClassFinderRepo } from 'app/repositories/classes/ClassFinderRepo/prisma'

export const makeClassFinder = (): ClassFinder => {
  const characterClassFinderRepo = new PrismaClassFinderRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassFinder(characterClassFinderRepo, errorLoggerRepo)

  return useCase
}
