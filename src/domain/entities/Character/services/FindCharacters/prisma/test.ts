import { Prisma } from '@prisma/client'
import { PrismaFindCharacters } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'
import { mockFindCharactersServiceParams } from '../mock'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'

const makeSUT = () => {
  mockedPrismaClient.character.findFirst.mockResolvedValue(
    mockPrismaCharacter(),
  )

  const sut = new PrismaFindCharacters()
  return { sut }
}

describe('PrismaFindCharacters', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()
    const prismaCharacters = [mockPrismaCharacter(), mockPrismaCharacter()]
    mockedPrismaClient.character.findMany.mockResolvedValue(prismaCharacters)

    const params = mockFindCharactersServiceParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.CharacterFindManyArgs<DefaultArgs> = {
      where: {
        name: {
          contains: filter.name?.like,
        },
      },
    }
    expect(mockedPrismaClient.character.findMany).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a characters', async () => {
    const { sut } = makeSUT()
    const params = mockFindCharactersServiceParams()

    const prismaCharacters = [mockPrismaCharacter(), mockPrismaCharacter()]
    mockedPrismaClient.character.findMany.mockResolvedValue(prismaCharacters)

    const result = await sut.find(params)

    const expectedClass = prismaCharacters.map((character) =>
      adaptPrismaCharacter(character),
    )
    expect(result).toEqual(expectedClass)
  })
})
