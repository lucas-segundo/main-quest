import { CharacterClass } from 'domain/entities/CharacterClass'
import { adaptPrismaCharacterClass } from './index'
import { mockPrismaCharacterClass } from 'infra/prisma/data/CharacterClass/mock'

describe('adaptPrismaCharacterClass', () => {
  it('should correctly adapt a PrismaCharacterClass to a CharacterClass', () => {
    const prismaCharacterClass = mockPrismaCharacterClass()

    const expectedCharacterClass: CharacterClass = {
      id: prismaCharacterClass.id.toString(),
      name: prismaCharacterClass.name,
    }

    const result = adaptPrismaCharacterClass(prismaCharacterClass)

    expect(result).toEqual(expectedCharacterClass)
  })
})
