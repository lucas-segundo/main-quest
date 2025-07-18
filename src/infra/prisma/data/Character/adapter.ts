import { Character } from 'domain/entities/Character'
import { PrismaCharacter } from 'infra/prisma/data/Character'

export const adaptPrismaCharacter = (
  prismaCharacter: PrismaCharacter,
): Character => {
  return {
    id: prismaCharacter.id.toString(),
    name: prismaCharacter.name,
    classID: prismaCharacter.classID.toString(),
    hitPoints: prismaCharacter.hitPoints,
    maxHitPoints: prismaCharacter.maxHitPoints,
    level: prismaCharacter.level,
    strength: prismaCharacter.strength,
    dexterity: prismaCharacter.dexterity,
    constitution: prismaCharacter.constitution,
    intelligence: prismaCharacter.intelligence,
    wisdom: prismaCharacter.wisdom,
    charisma: prismaCharacter.charisma,
  }
}
