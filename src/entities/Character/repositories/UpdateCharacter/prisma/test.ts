import { Prisma } from '@prisma/client'
import { PrismaUpdateCharacterRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'
import { faker } from '@faker-js/faker'
import { mockUpdateCharacterRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.character.update.mockResolvedValue(mockPrismaCharacter())
  const id = faker.string.uuid()

  const sut = new PrismaUpdateCharacterRepository()
  return { sut, id }
}

describe('PrismaUpdateCharacterRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const prismaCharacter = mockPrismaCharacter()
    mockedPrismaClient.character.update.mockResolvedValue(prismaCharacter)

    const params = mockUpdateCharacterRepositoryParams()
    await sut.update(id, params)

    const { data } = params
    const expectedParams: Prisma.CharacterUpdateArgs<DefaultArgs> = {
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    }
    expect(mockedPrismaClient.character.update).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should return a Character after update', async () => {
    const { sut, id } = makeSUT()

    const prismaCharacter = mockPrismaCharacter()
    mockedPrismaClient.character.update.mockResolvedValue(prismaCharacter)

    const result = await sut.update(id, mockUpdateCharacterRepositoryParams())

    const expectedCharacter = adaptPrismaCharacter(prismaCharacter)
    expect(result).toEqual(expectedCharacter)
  })
})
