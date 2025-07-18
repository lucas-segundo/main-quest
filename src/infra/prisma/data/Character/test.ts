import { Character } from 'domain/entities/Character'
import { adaptPrismaCharacter } from './adapter'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'

describe('adaptPrismaCharacter', () => {
  it('should correctly adapt a PrismaCharacter to a Character', () => {
    const prismaCharacter = mockPrismaCharacter()

    const expectedCharacter: Character = {
      id: prismaCharacter.id.toString(),
      name: prismaCharacter.name,
      classID: prismaCharacter.classID.toString(),
      level: prismaCharacter.level,
      hitPoints: prismaCharacter.hitPoints,
      maxHitPoints: prismaCharacter.maxHitPoints,
      strength: prismaCharacter.strength,
      dexterity: prismaCharacter.dexterity,
      constitution: prismaCharacter.constitution,
      intelligence: prismaCharacter.intelligence,
      wisdom: prismaCharacter.wisdom,
      charisma: prismaCharacter.charisma,
    }

    const result = adaptPrismaCharacter(prismaCharacter)

    expect(result).toEqual(expectedCharacter)
  })
})
