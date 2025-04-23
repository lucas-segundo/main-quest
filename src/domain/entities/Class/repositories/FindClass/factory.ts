import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaFindClassRepository } from './prisma'

export const makeFindClassRepository = (): PrismaFindClassRepository => {
  const repository = new PrismaFindClassRepository()

  return new Proxy<PrismaFindClassRepository>(
    repository,
    makeLogErrorProxyHandler(),
  )
}
