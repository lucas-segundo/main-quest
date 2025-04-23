import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaCreateClassRepository } from './prisma'

export const makeCreateClassRepository = (): PrismaCreateClassRepository => {
  const repository = new PrismaCreateClassRepository()

  return new Proxy<PrismaCreateClassRepository>(
    repository,
    makeLogErrorProxyHandler(),
  )
}
