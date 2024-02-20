import { CharacterClass } from 'domain/entities/CharacterClass'
import { PrismaCharacterClass } from 'infra/prisma/data/CharacterClass'

export const adaptPrismaCharacterClass = (
  prismaCharacterClass: PrismaCharacterClass,
): CharacterClass => {
  return {
    id: prismaCharacterClass.id.toString(),
    name: prismaCharacterClass.name,
  }
}
