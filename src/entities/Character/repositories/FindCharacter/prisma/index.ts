import { Character } from 'entities/Character'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/adapters/adaptPrismaCharacter'
import { FindCharacterRepository, FindCharacterRepositoryParams } from '..'

export class PrismaFindCharacter implements FindCharacterRepository {
  async find(params: FindCharacterRepositoryParams): Promise<Character | null> {
    const { filter } = params
    const prismaCharacter = await prisma.character.findFirst({
      where: {
        id: Number(filter.id?.equals),
        name: {
          contains: filter.name?.like,
        },
      },
    })

    if (prismaCharacter) {
      return adaptPrismaCharacter(prismaCharacter)
    }

    return null
  }
}
