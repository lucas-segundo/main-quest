import { PrismaFindCharacters } from './prisma'
import { FindCharactersRepository } from '.'

export const makeFindCharactersRepository = (): FindCharactersRepository => {
  return new PrismaFindCharacters()
}
