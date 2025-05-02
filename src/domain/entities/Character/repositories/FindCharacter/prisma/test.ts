import { Prisma } from '@prisma/client'
import { PrismaFindCharacter } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { NotFoundError } from 'domain/errors/NotFoundError'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'
import { mockFindClassRepositoryParams } from 'domain/entities/Class/repositories/FindClass/mock'
import { mockFindCharacterRepositoryParams } from '../mock'
import { adaptPrismaCharacter } from 'infra/prisma/adapters/adaptPrismaCharacter'

const makeSUT = () => {
  mockedPrismaClient.character.findFirst.mockResolvedValue(
    mockPrismaCharacter(),
  )

  const sut = new PrismaFindCharacter()
  return { sut }
}

describe('PrismaFindCharacter', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindCharacterRepositoryParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(filter.id.equals),
      },
    }
    expect(mockedPrismaClient.character.findFirst).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a character', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassRepositoryParams()
    const prismaCharacter = mockPrismaCharacter()
    mockedPrismaClient.character.findFirst.mockResolvedValue(prismaCharacter)

    const result = await sut.find(params)

    const expectedClass = adaptPrismaCharacter(prismaCharacter)
    expect(result).toEqual(expectedClass)
  })

  it('should throw if character not found', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.character.findFirst.mockResolvedValue(null)

    const params = mockFindClassRepositoryParams()
    await expect(sut.find(params)).rejects.toThrow(NotFoundError)
  })
})
