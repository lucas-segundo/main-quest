import { Spell } from 'entities/Spell'
import { NotFoundError } from 'app/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { FindSpellRepository, FindSpellRepositoryParams } from '..'

export class PrismaFindSpell implements FindSpellRepository {
  async find(params: FindSpellRepositoryParams): Promise<Spell> {
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
