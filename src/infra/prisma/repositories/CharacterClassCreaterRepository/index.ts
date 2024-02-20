import {
  CharacterClassCreaterRepo,
  CharacterClassCreaterRepoParams,
} from 'app/interfaces/CharacterClassCreaterRepository'
import { CharacterClass } from 'domain/entities/CharacterClass'
import prisma from 'infra/prisma'
import { adaptPrismaCharacterClass } from 'infra/prisma/adapters/adaptPrismaCharacterClass'

export class PrismaCharacterClassCreaterRepo
  implements CharacterClassCreaterRepo
{
  async create(
    params: CharacterClassCreaterRepoParams,
  ): Promise<CharacterClass> {
    const prismaCharacterClass = await prisma.class.create({
      data: {
        name: params.name,
      },
    })

    return adaptPrismaCharacterClass(prismaCharacterClass)
  }
}
