import { Class } from 'domain/entities/Class'
import { PrismaClass } from 'infra/prisma/data/Class'

export const adaptPrismaClass = (prismaClass: PrismaClass): Class => {
  return {
    id: prismaClass.id.toString(),
    name: prismaClass.name,
    subclasses: [],
  }
}
