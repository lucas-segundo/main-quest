import { PrismaClassCreaterRepo } from 'infra/prisma/repositories/ClassCreaterRepository'
import { ClassCreater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'

export const makeClassCreater = (): ClassCreater => {
  const chracterClassCreaterRepo = new PrismaClassCreaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassCreater(chracterClassCreaterRepo, errorLoggerRepo)

  return useCase
}
