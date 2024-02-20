import { Prisma } from '@prisma/client'
import { PrismaCharacterClassCreaterRepo } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockCharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater/mock'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaCharacterClass } from 'infra/prisma/data/CharacterClass/mock'
import { adaptPrismaCharacterClass } from 'infra/prisma/adapters/adaptPrismaCharacterClass'

const makeSUT = () => {
  mockedPrismaClient.class.create.mockResolvedValue(mockPrismaCharacterClass())

  const sut = new PrismaCharacterClassCreaterRepo()
  return { sut }
}

describe('PrismaCharacterClassCreaterRepo', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockCharacterClassCreaterParams()
    await sut.create(params)

    const expectedParams: Prisma.ClassCreateArgs<DefaultArgs> = {
      data: {
        name: params.name,
      },
    }
    expect(mockedPrismaClient.class.create).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a CharacterClass after creation', async () => {
    const { sut } = makeSUT()

    const params = mockCharacterClassCreaterParams()
    const prismaCharacterClass = { ...mockPrismaCharacterClass(), ...params }
    mockedPrismaClient.class.create.mockResolvedValue(prismaCharacterClass)

    const result = await sut.create(params)

    const expectedCharacterClass =
      adaptPrismaCharacterClass(prismaCharacterClass)
    expect(result).toEqual(expectedCharacterClass)
  })
})
