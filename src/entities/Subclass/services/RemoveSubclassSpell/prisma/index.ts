import prisma from 'infra/prisma'
import { RemoveSubclassSpellService } from '..'
import { Subclass } from 'entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'

export class PrismaRemoveSubclassSpellService
  implements RemoveSubclassSpellService
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
