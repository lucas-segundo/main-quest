import { Character } from 'entities/Character'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'
import { UpdateCharacterRepository, UpdateCharacterRepositoryParams } from '..'

export class PrismaUpdateCharacterRepository
  implements UpdateCharacterRepository
{
  async update(
    id: string,
    params: UpdateCharacterRepositoryParams,
  ): Promise<Character> {
    const { data } = params
    const prismaCharacter = await prisma.character.update({
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    })

    return adaptPrismaCharacter(prismaCharacter)
  }
}
