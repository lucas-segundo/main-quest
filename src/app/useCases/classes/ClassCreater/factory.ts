import { ClassCreater } from '.'
import { PrismaClassCreaterRepo } from 'app/repositories/classes/ClassCreaterRepo/prisma'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassCreater = (): ClassCreater => {
  const classCreaterRepo = new PrismaClassCreaterRepo()
  const useCase = new ClassCreater(classCreaterRepo, makeErrorLoggerRepo())

  return useCase
}
