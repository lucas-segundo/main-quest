import prisma from 'infra/prisma'
import { AddSubclassSpellRepository } from '..'
import { Subclass } from 'entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaAddSubclassSpellRepository
  implements AddSubclassSpellRepository
{
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
