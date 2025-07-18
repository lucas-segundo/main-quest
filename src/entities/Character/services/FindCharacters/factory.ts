import { PrismaFindCharacters } from './prisma'
import { FindCharactersService } from '.'

export const makeFindCharactersService = (): FindCharactersService => {
  return new PrismaFindCharacters()
}
