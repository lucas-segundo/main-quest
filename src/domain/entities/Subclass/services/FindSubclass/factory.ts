import { PrismaFindSubclass } from './prisma'
import { FindSubclassService } from '.'

export const makeFindSubclassService = (): FindSubclassService => {
  return new PrismaFindSubclass()
}
