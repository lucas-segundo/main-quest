import { Prisma } from '@prisma/client'
import { PrismaCharacterClassCreaterRepo } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockCharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater/mock'
import { mockedPrismaClient } from 'infra/prisma/mock'

const makeSUT = () => {
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
})
