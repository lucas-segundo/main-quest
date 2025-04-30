import prisma from 'infra/prisma'
import {
  RemoveClassSkillRepository,
  RemoveClassSkillRepositoryParams,
} from '..'
import { Class } from 'domain/entities/Class'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaRemoveClassSkillRepository
  implements RemoveClassSkillRepository
{
  async remove(
    classID: string,
    skillIDs: string[],
    params?: RemoveClassSkillRepositoryParams,
  ): Promise<Class> {
    const updatedClass = await prisma.class.update({
      where: { id: Number(classID) },
      data: {
        classesSkills: {
          deleteMany: {
            classID: Number(classID),
            skillID: {
              in: skillIDs.map((skillID) => Number(skillID)),
            },
          },
        },
      },
      include: {
        classesSkills: {
          include: {
            skill: params?.include?.skills,
          },
        },
      },
    })

    return adaptPrismaClass(updatedClass)
  }
}
