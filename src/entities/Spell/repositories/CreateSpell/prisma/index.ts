import { Spell } from 'entities/Spell'
import prisma from 'infra/prisma'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { CreateSpellRepository, CreateSpellRepositoryParams } from '..'

export class PrismaCreateSpellRepository implements CreateSpellRepository {
  async create(params: CreateSpellRepositoryParams): Promise<Spell> {
    const prismaSpell = await prisma.spell.create({
      data: {
        name: params.name,
      },
    })

    return adaptPrismaSpell(prismaSpell)
  }
}
