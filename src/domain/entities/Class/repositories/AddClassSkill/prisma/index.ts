import prisma from 'infra/prisma'
import { AddClassSkillRepository, AddClassSkillRepositoryParams } from '..'
import { Class } from 'domain/entities/Class'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaAddClassSkillRepository implements AddClassSkillRepository {
  async add(
    classID: string,
    skillIDs: string[],
    params?: AddClassSkillRepositoryParams,
  ): Promise<Class> {
    const updatedClass = await prisma.class.update({
      where: { id: Number(classID) },
      data: {
        classesSkills: {
          createMany: {
            data: skillIDs.map((skillID) => ({
              classID: Number(classID),
              skillID: Number(skillID),
            })),
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
