import { Class } from 'domain/entities/Class'
import { PrismaClass } from 'infra/prisma/data/Class'
import { adaptPrismaSubclass } from '../adaptPrismaSubclass'

export const adaptPrismaClass = (prismaClass: PrismaClass): Class => {
  return {
    id: prismaClass.id.toString(),
    name: prismaClass.name,
    subclasses:
      prismaClass.subclasses?.map((subclass) =>
        adaptPrismaSubclass(subclass),
      ) || [],
    skills:
      prismaClass.classesSkills?.map((classSkill) => ({
        id: classSkill.skill.id.toString(),
        name: classSkill.skill.name,
      })) || [],
  }
}
