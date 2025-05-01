import prisma from 'infra/prisma'
import { AddSubclassSkillRepository } from '..'
import { Subclass } from 'domain/entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaAddSubclassSkillRepository
  implements AddSubclassSkillRepository
{
  async add(subclassID: string, skillIDs: string[]): Promise<Subclass> {
    const updatedSubclass = await prisma.subclass.update({
      where: { id: Number(subclassID) },
      data: {
        subclassesSkills: {
          createMany: {
            data: skillIDs.map((skillID) => ({
              skillID: Number(skillID),
            })),
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
