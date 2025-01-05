import { makeLogErrorProxyHandler } from 'app/utils/LogErrorProxy/factory'
import { PrismaUpdateClassRepository } from './prisma'

export const makeCreateClassRepository = (): PrismaUpdateClassRepository => {
  const repository = new PrismaUpdateClassRepository()

  return new Proxy<PrismaUpdateClassRepository>(
    repository,
    makeLogErrorProxyHandler(),
  )
}
