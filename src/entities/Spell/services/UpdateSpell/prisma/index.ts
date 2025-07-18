import { Spell } from 'entities/Spell'
import prisma from 'infra/prisma'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { UpdateSpellService, UpdateSpellServiceParams } from '..'

export class PrismaUpdateSpellService implements UpdateSpellService {
  async update(id: string, params: UpdateSpellServiceParams): Promise<Spell> {
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
