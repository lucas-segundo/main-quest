import prisma from 'infra/prisma'
import {
  RemoveSubclassSkillRepository,
  RemoveSubclassSkillRepositoryParams,
} from '..'
import { Subclass } from 'domain/entities/Subclass'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaRemoveSubclassSkillRepository
  implements RemoveSubclassSkillRepository
{
  async remove(
    classID: string,
    skillIDs: string[],
    params?: RemoveSubclassSkillRepositoryParams,
  ): Promise<Subclass> {
    const updatedSubclass = await prisma.subclass.update({
      where: { id: Number(classID) },
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
            skill: params?.include?.skills,
          },
        },
      },
    })

    return adaptPrismaSubclass(updatedSubclass)
  }
}
