import prisma from 'infra/prisma'
import { RemoveSubclassSkillRepository } from '..'
import { Subclass } from 'entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaRemoveSubclassSkillRepository
  implements RemoveSubclassSkillRepository
{
  async remove(subclassID: string, skillIDs: string[]): Promise<Subclass> {
    await prisma.subclassesSkills.deleteMany({
      where: {
        subclassID: Number(subclassID),
        skillID: {
          in: skillIDs.map((skillID) => Number(skillID)),
        },
      },
    })
    const updatedSubclass = await prisma.subclass.findFirstOrThrow({
      where: {
        id: Number(subclassID),
      },
      include: {
        subclassesSkills: {
          include: {
            skill: true,
          },
        },
      },
    })

    return adaptPrismaSubclass(updatedSubclass)
  }
}
