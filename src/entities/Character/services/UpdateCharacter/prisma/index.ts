import { Character } from 'entities/Character'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'
import { UpdateCharacterService, UpdateCharacterServiceParams } from '..'

export class PrismaUpdateCharacterService implements UpdateCharacterService {
  async update(
    id: string,
    params: UpdateCharacterServiceParams,
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
