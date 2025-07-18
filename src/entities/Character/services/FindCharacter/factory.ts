import { PrismaFindCharacter } from './prisma'
import { FindCharacterService } from '.'

export const makeFindCharacterService = (): FindCharacterService => {
  return new PrismaFindCharacter()
}
