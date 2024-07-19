import { PrismaClassCreaterRepo } from 'infra/prisma/repositories/ClassCreaterRepo'
import { ClassCreater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'

export const makeClassCreater = (): ClassCreater => {
  const classCreaterRepo = new PrismaClassCreaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassCreater(classCreaterRepo, errorLoggerRepo)

  return useCase
}
