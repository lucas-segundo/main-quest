import { PrismaCreateClassRepository } from 'app/repositories/classes/CreateClass/prisma'
import { ClassCreater } from '.'
import { makeErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/pino/factory'

export const makeClassCreater = (): ClassCreater => {
  const classCreaterRepo = new PrismaCreateClassRepository()
  const useCase = new ClassCreater(classCreaterRepo, makeErrorLoggerRepo())

  return useCase
}
