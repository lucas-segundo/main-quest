import { Character } from 'entities/Character'
import { PrismaCharacter } from 'infra/prisma/data/Character'

export const adaptPrismaCharacter = (
  prismaCharacter: PrismaCharacter,
): Character => {
  return {
    id: prismaCharacter.id.toString(),
    name: prismaCharacter.name,
    classID: prismaCharacter.classID.toString(),
    level: prismaCharacter.level,
  }
}
