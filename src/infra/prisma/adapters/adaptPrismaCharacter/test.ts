import { Character } from 'entities/Character'
import { adaptPrismaCharacter } from './index'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'

describe('adaptPrismaCharacter', () => {
  it('should correctly adapt a PrismaCharacter to a Character', () => {
    const prismaCharacter = mockPrismaCharacter()

    const expectedCharacter: Character = {
      id: prismaCharacter.id.toString(),
      name: prismaCharacter.name,
      classID: prismaCharacter.classID.toString(),
      level: prismaCharacter.level,
      healthPoints: prismaCharacter.healthPoints,
      maxHealthPoints: prismaCharacter.maxHealthPoints,
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
