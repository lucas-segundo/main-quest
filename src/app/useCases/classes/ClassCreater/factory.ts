import { PrismaCreateClassRepository } from 'domain/entities/Class/repositories/CreateClass/prisma'
import { ClassCreater } from '.'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogError/pino/factory'

export const makeClassCreater = (): ClassCreater => {
  const classCreaterRepo = new PrismaCreateClassRepository()
  const useCase = new ClassCreater(classCreaterRepo, makeLogErrorRepository())

  return useCase
}
