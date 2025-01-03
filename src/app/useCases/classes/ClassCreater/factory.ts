import { ClassCreater } from '.'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { pinoLogger } from 'infra/pino'
import { PrismaClassCreaterRepo } from 'app/repositories/classes/ClassCreaterRepo/prisma'

export const makeClassCreater = (): ClassCreater => {
  const classCreaterRepo = new PrismaClassCreaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassCreater(classCreaterRepo, errorLoggerRepo)

  return useCase
}
