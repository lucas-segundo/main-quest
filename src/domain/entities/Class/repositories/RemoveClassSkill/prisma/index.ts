import prisma from 'infra/prisma'
import { RemoveClassSkillRepository } from '..'
import { Class } from 'domain/entities/Class'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaRemoveClassSkillRepository
  implements RemoveClassSkillRepository
{
  async remove(classID: string, skillIDs: string[]): Promise<Class> {
    await prisma.classesSkills.deleteMany({
      where: {
        classID: Number(classID),
        skillID: {
          in: skillIDs.map((skillID) => Number(skillID)),
        },
      },
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
