import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaFindSubclass } from './prisma'

export const makeCreateClassRepository = (): PrismaFindSubclass => {
  const repository = new PrismaFindSubclass()

  return new Proxy<PrismaFindSubclass>(repository, makeLogErrorProxyHandler())
}
