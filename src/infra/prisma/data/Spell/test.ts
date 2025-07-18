import { Spell } from 'domain/entities/Spell'
import { adaptPrismaSpell } from './adapter'
import { mockPrismaSpell } from 'infra/prisma/data/Spell/mock'

describe('adaptPrismaSpell', () => {
  it('should correctly adapt a PrismaSubclass to a Spell', () => {
    const prismaSubclass = mockPrismaSpell()

    const expectedSubclass: Spell = {
      id: prismaSubclass.id.toString(),
      name: prismaSubclass.name,
    }

    const result = adaptPrismaSpell(prismaSubclass)

    expect(result).toEqual(expectedSubclass)
  })
})
