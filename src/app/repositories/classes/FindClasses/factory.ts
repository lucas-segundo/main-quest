import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaFindClassesRepository } from './prisma'

export const makeCreateClassRepository = (): PrismaFindClassesRepository => {
  const repository = new PrismaFindClassesRepository()

  return new Proxy<PrismaFindClassesRepository>(
    repository,
    makeLogErrorProxyHandler(),
  )
}
