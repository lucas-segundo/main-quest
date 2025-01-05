import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaFindSubclasses } from './prisma'

export const makeCreateClassRepository = (): PrismaFindSubclasses => {
  const repository = new PrismaFindSubclasses()

  return new Proxy<PrismaFindSubclasses>(repository, makeLogErrorProxyHandler())
}
