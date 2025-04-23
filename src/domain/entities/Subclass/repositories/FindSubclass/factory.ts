import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaFindSubclass } from './prisma'
import { FindSubclassRepository } from '.'

export const makeFindSubclassRepository = (): FindSubclassRepository => {
  const repository = new PrismaFindSubclass()

  return new Proxy<PrismaFindSubclass>(repository, makeLogErrorProxyHandler())
}
