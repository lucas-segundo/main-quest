import { Character } from 'domain/entities/Character'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'
import { FindCharactersService, FindCharactersServiceParams } from '..'

export class PrismaFindCharacters implements FindCharactersService {
  async find(params: FindCharactersServiceParams): Promise<Character[]> {
    const { filter } = params
    const prismaCharacters = await prisma.character.findMany({
      where: {
        name: {
          contains: filter.name?.lk,
        },
      },
    })

    return prismaCharacters.map((character) => adaptPrismaCharacter(character))
  }
}
