import { Character } from 'entities/Character'
import { NotFoundError } from 'domain/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/adapters/adaptPrismaCharacter'
import { FindCharacterRepository, FindCharacterRepositoryParams } from '..'

export class PrismaFindCharacter implements FindCharacterRepository {
  async find(params: FindCharacterRepositoryParams): Promise<Character> {
    const { filter } = params
    const prismaCharacter = await prisma.character.findFirst({
      where: {
        id: Number(filter.id.equals),
      },
    })

    if (prismaCharacter) {
      return adaptPrismaCharacter(prismaCharacter)
    } else {
      throw new NotFoundError('Character')
    }
  }
}
