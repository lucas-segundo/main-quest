import { Prisma } from '@prisma/client'
import { PrismaCreateCharacterRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'
import { adaptPrismaCharacter } from 'infra/prisma/adapters/adaptPrismaCharacter'
import { mockCreateCharacterRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.character.create.mockResolvedValue(mockPrismaCharacter())

  const sut = new PrismaCreateCharacterRepository()
  return { sut }
}

describe('PrismaCreateCharacterRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.character.create.mockResolvedValue(mockPrismaCharacter())
    const params = mockCreateCharacterRepositoryParams()
    await sut.create(params)

    const expectedParams: Prisma.CharacterCreateArgs<DefaultArgs> = {
      data: {
        name: params.name,
        classID: Number(params.classID),
        level: params.level,
        healthPoints: params.healthPoints,
        maxHealthPoints: params.maxHealthPoints,
        strength: params.strength,
        dexterity: params.dexterity,
        constitution: params.constitution,
        intelligence: params.intelligence,
        wisdom: params.wisdom,
        charisma: params.charisma,
      },
    }
    expect(mockedPrismaClient.character.create).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should return a entity after creation', async () => {
    const { sut } = makeSUT()

    const prismaCharacter = mockPrismaCharacter()
    mockedPrismaClient.character.create.mockResolvedValue(prismaCharacter)

    const result = await sut.create(mockCreateCharacterRepositoryParams())

    const expectedCharacter = adaptPrismaCharacter(prismaCharacter)
    expect(result).toEqual(expectedCharacter)
  })
})
