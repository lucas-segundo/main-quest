import prisma from 'infra/prisma'
import { AddSubclassSpellService } from '..'
import { Subclass } from 'domain/entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'

export class PrismaAddSubclassSpellService implements AddSubclassSpellService {
  async add(subclassID: string, spellIDs: string[]): Promise<Subclass> {
    await prisma.subclassesSpells.createMany({
      data: spellIDs.map((spellID) => ({
        subclassID: Number(subclassID),
        spellID: Number(spellID),
      })),
    })

    const updatedSubclass = await prisma.subclass.findFirstOrThrow({
      where: {
        id: Number(subclassID),
      },
      include: {
        subclassesSpells: {
          include: {
            spell: true,
          },
        },
      },
    })

    return adaptPrismaSubclass(updatedSubclass)
  }
}
