import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaUpdateSubclassRepository } from './prisma'

export const makeCreateClassRepository = (): PrismaUpdateSubclassRepository => {
  const repository = new PrismaUpdateSubclassRepository()

  return new Proxy<PrismaUpdateSubclassRepository>(
    repository,
    makeLogErrorProxyHandler(),
  )
}
