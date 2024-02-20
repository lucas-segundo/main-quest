import {
  CharacterClassCreaterRepo,
  CharacterClassCreaterRepoParams,
} from 'app/interfaces/CharacterClassCreaterRepository'
import { CharacterClass } from 'domain/entities/CharacterClass'
import prisma from 'infra/prisma'

export class PrismaCharacterClassCreaterRepo
  implements CharacterClassCreaterRepo
{
  async create(
    params: CharacterClassCreaterRepoParams,
  ): Promise<CharacterClass> {
    await prisma.class.create({
      data: {
        name: params.name,
      },
    })

    return {} as CharacterClass
  }
}
