import prisma from 'infra/prisma'
import { AddSubclassSkillRepository } from '..'
import { Subclass } from 'domain/entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaAddSubclassSkillRepository
  implements AddSubclassSkillRepository
{
  async add(subclassID: string, skillIDs: string[]): Promise<Subclass> {
    await prisma.subclassesSkills.createMany({
      data: skillIDs.map((skillID) => ({
        subclassID: Number(subclassID),
        skillID: Number(skillID),
      })),
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
