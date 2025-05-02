import { Character } from 'domain/entities/Character'
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
      },
    })

    return adaptPrismaCharacter(prismaCharacter)
  }
}
