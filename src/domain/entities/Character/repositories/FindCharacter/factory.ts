import { PrismaFindCharacter } from './prisma'
import { FindCharacterRepository } from '.'

export const makeFindCharacterRepository = (): FindCharacterRepository => {
  return new PrismaFindCharacter()
}
