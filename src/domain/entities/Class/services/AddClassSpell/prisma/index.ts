import prisma from 'infra/prisma'
import { AddClassSpellService } from '..'
import { Class } from 'domain/entities/Class'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'

export class PrismaAddClassSpellService implements AddClassSpellService {
  async add(classID: string, spellIDs: string[]): Promise<Class> {
    await prisma.classesSpells.createMany({
      data: spellIDs.map((spellID) => ({
        classID: Number(classID),
        spellID: Number(spellID),
      })),
    })

    const updatedClass = await prisma.class.findFirstOrThrow({
      where: {
        id: Number(classID),
      },
      include: {
        classesSpells: {
          include: {
            spell: true,
          },
        },
      },
    })

    return adaptPrismaClass(updatedClass)
  }
}
