import { PrismaFindSubclass } from './prisma'
import { FindSubclassRepository } from '.'

export const makeFindSubclassRepository = (): FindSubclassRepository => {
  return new PrismaFindSubclass()
}
