import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaCreateSubclassRepository } from './prisma'

export const makeCreateClassRepository = (): PrismaCreateSubclassRepository => {
  const repository = new PrismaCreateSubclassRepository()

  return new Proxy<PrismaCreateSubclassRepository>(
    repository,
    makeLogErrorProxyHandler(),
  )
}
