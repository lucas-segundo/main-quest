import { PrismaCreateCharacterService } from './prisma'

export const makeCreateCharacterService = (): PrismaCreateCharacterService => {
  return new PrismaCreateCharacterService()
}
