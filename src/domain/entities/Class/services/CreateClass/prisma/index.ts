import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import {
  adaptPrismaClass,
  adaptToPrismaSpellcastingAbility,
} from 'infra/prisma/data/Class/adapter'
import { CreateClassService, CreateClassServiceParams } from '..'

export class PrismaCreateClassService implements CreateClassService {
  async create(params: CreateClassServiceParams): Promise<Class> {
    const prismaClass = await prisma.class.create({
      data: {
        name: params.name,
        spellcastingAbility: adaptToPrismaSpellcastingAbility(
          params.spellCastingAbility,
        ),
        hitDice: params.hitDice,
      },
      include: {
        subclasses: true,
      },
    })

    return adaptPrismaClass(prismaClass)
  }
}
