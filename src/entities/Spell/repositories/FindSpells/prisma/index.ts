import { Spell } from 'entities/Spell'
import prisma from 'infra/prisma'
import { adaptPrismaSpell } from 'infra/prisma/adapters/adaptPrismaSpell'
import { FindSpellsRepository, FindSpellsRepositoryParams } from '..'

export class PrismaFindSpells implements FindSpellsRepository {
  async find(params: FindSpellsRepositoryParams): Promise<Spell[]> {
    const { filter } = params
    const prismaSpells = await prisma.spell.findMany({
      where: {
        name: {
          contains: filter.name?.like,
        },
        classesSpells: {
          some: {
            classID: Number(filter.classID?.equals),
          },
        },
        subclassesSpells: {
          some: {
            subclassID: Number(filter.subclassID?.equals),
          },
        },
      },
    })

    return prismaSpells.map((spell) => adaptPrismaSpell(spell))
  }
}
