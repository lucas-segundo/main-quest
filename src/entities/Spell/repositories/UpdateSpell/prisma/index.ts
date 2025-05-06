import { Spell } from 'entities/Spell'
import prisma from 'infra/prisma'
import { adaptPrismaSpell } from 'infra/prisma/adapters/adaptPrismaSpell'
import { UpdateSpellRepository, UpdateSpellRepositoryParams } from '..'

export class PrismaUpdateSpellRepository implements UpdateSpellRepository {
  async update(
    id: string,
    params: UpdateSpellRepositoryParams,
  ): Promise<Spell> {
    const { data } = params
    const prismaSpell = await prisma.spell.update({
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    })

    return adaptPrismaSpell(prismaSpell)
  }
}
