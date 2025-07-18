import { Spell } from 'domain/entities/Spell'
import { NotFoundError } from 'app/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { FindSpellService, FindSpellServiceParams } from '..'

export class PrismaFindSpell implements FindSpellService {
  async find(params: FindSpellServiceParams): Promise<Spell> {
    const { filter } = params
    const prismaSpell = await prisma.spell.findFirst({
      where: {
        id: Number(filter.id.equals),
      },
    })

    if (prismaSpell) {
      return adaptPrismaSpell(prismaSpell)
    } else {
      throw new NotFoundError('Spell')
    }
  }
}
