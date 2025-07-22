import { Prisma } from '@prisma/client'
import { PrismaUpdateCharacterService } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaCharacter } from 'infra/prisma/data/Character/mock'
import { adaptPrismaCharacter } from 'infra/prisma/data/Character/adapter'
import { faker } from '@faker-js/faker'
import { mockUpdateCharacterServiceParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.character.update.mockResolvedValue(mockPrismaCharacter())
  const id = faker.string.uuid()

  const sut = new PrismaUpdateCharacterService()
  return { sut, id }
}

describe('PrismaUpdateCharacterService', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const prismaCharacter = mockPrismaCharacter()
    mockedPrismaClient.character.update.mockResolvedValue(prismaCharacter)

    const params = mockUpdateCharacterServiceParams()
    await sut.update(id, params)

    const { data } = params
    const expectedParams: Prisma.CharacterUpdateArgs<DefaultArgs> = {
      data: {
        name: data.name,
        level: data.level,
        hitPoints: data.hitPoints,
        maxHitPoints: data.maxHitPoints,
        strength: data.strength,
        dexterity: data.dexterity,
        constitution: data.constitution,
        intelligence: data.intelligence,
        wisdom: data.wisdom,
        charisma: data.charisma,
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

    const result = await sut.update(id, mockUpdateCharacterServiceParams())

    const expectedCharacter = adaptPrismaCharacter(prismaCharacter)
    expect(result).toEqual(expectedCharacter)
  })
})
