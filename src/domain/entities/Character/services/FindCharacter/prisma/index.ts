import { Character } from 'domain/entities/Character'
import prisma from 'infra/prisma'
import { FindCharacterService, FindCharacterServiceParams } from '..'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'

export class PrismaFindCharacter implements FindCharacterService {
  async find(params: FindCharacterServiceParams): Promise<Character | null> {
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
