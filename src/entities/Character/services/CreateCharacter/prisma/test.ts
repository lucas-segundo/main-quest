import { Prisma } from '@prisma/client'
import { PrismaCreateCharacterService } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'
import { mockCreateCharacterServiceParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.character.create.mockResolvedValue(mockPrismaCharacter())

  const sut = new PrismaCreateCharacterService()
  return { sut }
}

describe('PrismaCreateCharacterService', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.character.create.mockResolvedValue(mockPrismaCharacter())
    const params = mockCreateCharacterServiceParams()
    await sut.create(params)

    const expectedParams: Prisma.CharacterCreateArgs<DefaultArgs> = {
      data: {
        name: params.name,
        classID: Number(params.classID),
        level: params.level,
        hitPoints: params.hitPoints,
        maxHitPoints: params.maxHitPoints,
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

    const result = await sut.create(mockCreateCharacterServiceParams())

    const expectedCharacter = adaptPrismaCharacter(prismaCharacter)
    expect(result).toEqual(expectedCharacter)
  })
})
