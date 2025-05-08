import { Subclass } from 'entities/Subclass'
import { PrismaSubclass } from 'infra/prisma/data/Subclass'

export const adaptPrismaSubclass = (
  prismaSubclass: PrismaSubclass,
): Subclass => {
  return {
    id: prismaSubclass.id.toString(),
    name: prismaSubclass.name,
  }
}
