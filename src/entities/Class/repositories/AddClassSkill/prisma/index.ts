import prisma from 'infra/prisma'
import { AddClassSkillRepository } from '..'
import { Class } from 'entities/Class'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaAddClassSkillRepository implements AddClassSkillRepository {
  async add(classID: string, skillIDs: string[]): Promise<Class> {
    await prisma.classesSkills.createMany({
      data: skillIDs.map((skillID) => ({
        classID: Number(classID),
        skillID: Number(skillID),
      })),
    })

    const updatedClass = await prisma.class.findFirstOrThrow({
      where: {
        id: Number(classID),
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
