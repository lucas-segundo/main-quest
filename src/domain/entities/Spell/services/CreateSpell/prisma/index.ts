import { Spell } from 'domain/entities/Spell'
import prisma from 'infra/prisma'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { CreateSpellService, CreateSpellServiceParams } from '..'

export class PrismaCreateSpellService implements CreateSpellService {
  async create(params: CreateSpellServiceParams): Promise<Spell> {
    const prismaSpell = await prisma.spell.create({
      data: {
        name: params.name,
      },
    })

    return adaptPrismaSpell(prismaSpell)
  }
}
