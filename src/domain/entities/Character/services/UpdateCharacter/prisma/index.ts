import { Character } from 'domain/entities/Character'
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
        level: data.level,
        hitPoints: data.hitPoints,
        maxHitPoints: data.maxHitPoints,
        strength: data.strength,
        dexterity: data.dexterity,
        constitution: data.constitution,
        intelligence: data.intelligence,
        wisdom: data.wisdom,
        charisma: data.charisma,
      },
      where: {
        id: Number(id),
      },
    })

    return adaptPrismaCharacter(prismaCharacter)
  }
}
