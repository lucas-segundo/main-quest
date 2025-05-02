import { Character } from 'domain/entities/Character'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/adapters/adaptPrismaCharacter'
import { FindCharactersRepository, FindCharactersRepositoryParams } from '..'

export class PrismaFindCharacters implements FindCharactersRepository {
  async find(params: FindCharactersRepositoryParams): Promise<Character[]> {
    const { filter } = params
    const prismaCharacters = await prisma.character.findMany({
      where: {
        name: {
          contains: filter.name?.like,
        },
      },
    })

    return prismaCharacters.map((character) => adaptPrismaCharacter(character))
  }
}
