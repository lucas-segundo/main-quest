import prisma from 'infra/prisma'
import { RemoveSubclassSkillRepository } from '..'
import { Subclass } from 'domain/entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaRemoveSubclassSkillRepository
  implements RemoveSubclassSkillRepository
{
  async remove(subclassID: string, skillIDs: string[]): Promise<Subclass> {
    const updatedSubclass = await prisma.subclass.update({
      where: { id: Number(subclassID) },
      data: {
        subclassesSkills: {
          deleteMany: {
            skillID: {
              in: skillIDs.map((skillID) => Number(skillID)),
            },
          },
        },
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
