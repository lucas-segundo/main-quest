import { Subclass } from 'domain/entities/Subclass'
import { adaptPrismaSubclass } from './adapter'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'

describe('adaptPrismaSubclass', () => {
  it('should correctly adapt a PrismaSubclass to a Subclass', () => {
    const prismaSubclass = mockPrismaSubclass()

    const expectedSubclass: Subclass = {
      id: prismaSubclass.id.toString(),
      name: prismaSubclass.name,
    }

    const result = adaptPrismaSubclass(prismaSubclass)

    expect(result).toEqual(expectedSubclass)
  })
})
