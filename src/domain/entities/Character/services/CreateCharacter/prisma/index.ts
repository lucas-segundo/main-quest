import { Character } from 'domain/entities/Character'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'
import { CreateCharacterService, CreateCharacterServiceParams } from '..'

export class PrismaCreateCharacterService implements CreateCharacterService {
  async create(params: CreateCharacterServiceParams): Promise<Character> {
    const prismaCharacter = await prisma.character.create({
      data: {
        name: params.name,
        classID: Number(params.classID),
        level: params.level,
        hitPoints: params.hitPoints,
        maxHitPoints: params.maxHitPoints,
        strength: params.strength,
        dexterity: params.dexterity,
        constitution: params.constitution,
        intelligence: params.intelligence,
        wisdom: params.wisdom,
        charisma: params.charisma,
      },
    })

    return adaptPrismaCharacter(prismaCharacter)
  }
}
