import prisma from 'infra/prisma'
import { RemoveClassSpellRepository } from '..'
import { Class } from 'entities/Class'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'

export class PrismaRemoveClassSpellRepository
  implements RemoveClassSpellRepository
{
  async remove(classID: string, spellIDs: string[]): Promise<Class> {
    await prisma.classesSpells.deleteMany({
      where: {
        classID: Number(classID),
        spellID: {
          in: spellIDs.map((spellID) => Number(spellID)),
        },
      },
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
