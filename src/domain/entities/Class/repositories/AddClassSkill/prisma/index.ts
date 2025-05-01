import prisma from 'infra/prisma'
import { AddClassSkillRepository } from '..'
import { Class } from 'domain/entities/Class'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaAddClassSkillRepository implements AddClassSkillRepository {
  async add(classID: string, skillIDs: string[]): Promise<Class> {
    const updatedClass = await prisma.class.update({
      where: { id: Number(classID) },
      data: {
        classesSkills: {
          createMany: {
            data: skillIDs.map((skillID) => ({
              skillID: Number(skillID),
            })),
          },
        },
      },
      include: {
        classesSkills: {
          include: {
            skill: true,
          },
        },
      },
    })

    return adaptPrismaClass(updatedClass)
  }
}
