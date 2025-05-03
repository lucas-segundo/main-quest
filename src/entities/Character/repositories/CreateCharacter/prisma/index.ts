import { Character } from 'entities/Character'
import prisma from 'infra/prisma'
import { adaptPrismaCharacter } from 'infra/prisma/adapters/adaptPrismaCharacter'
import { CreateCharacterRepository, CreateCharacterRepositoryParams } from '..'

export class PrismaCreateCharacterRepository
  implements CreateCharacterRepository
{
  async create(params: CreateCharacterRepositoryParams): Promise<Character> {
    const prismaCharacter = await prisma.character.create({
      data: {
        name: params.name,
        classID: Number(params.classID),
        level: params.level,
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
