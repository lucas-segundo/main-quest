import prisma from 'infra/prisma'
import { RemoveSubclassSpellRepository } from '..'
import { Subclass } from 'entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaRemoveSubclassSpellRepository
  implements RemoveSubclassSpellRepository
{
  async remove(subclassID: string, spellIDs: string[]): Promise<Subclass> {
    await prisma.subclassesSpells.deleteMany({
      where: {
        subclassID: Number(subclassID),
        spellID: {
          in: spellIDs.map((spellID) => Number(spellID)),
        },
      },
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
