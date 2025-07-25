import { CreateCharacterUseCase } from '.'
import { UniqueError } from 'app/errors/UniqueError'
import { mockCharacter } from 'domain/entities/Character/mock'
import {
  mockCreateCharacterService,
  mockCreateCharacterServiceParams,
} from 'domain/entities/Character/services/CreateCharacter/mock'
import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { mockFindClassService } from 'domain/entities/Class/services/FindClass/mock'
import { mockClass } from 'domain/entities/Class/mock'
import * as calculate from 'domain/metrics/calculateHP'

const mockData = () => {
  const character = mockCharacter()
  const params = mockCreateCharacterServiceParams()
  const classData = mockClass()

  return { character, params, classData }
}

const makeSUT = () => {
  const createCharacterService = mockCreateCharacterService()
  const findCharacterService = mockFindCharacterService()
  const findClassService = mockFindClassService()
  const sut = new CreateCharacterUseCase(
    createCharacterService,
    findCharacterService,
    findClassService,
  )

  return {
    sut,
    createCharacterService,
    findCharacterService,
    findClassService,
  }
}

describe('CreateCharacterUseCase', () => {
  it('should throw UniqueError if character already exists', async () => {
    const { sut, findCharacterService, findClassService } = makeSUT()
    const { character, params, classData } = mockData()

    findCharacterService.find.mockResolvedValue(character)
    findClassService.find.mockResolvedValue(classData)

    await expect(sut.execute(params)).rejects.toThrow(UniqueError)

    expect(findCharacterService.find).toHaveBeenCalledWith({
      filter: { name: { like: params.name } },
    })
  })

  it('should call createCharacterService with correct params if character does not exist', async () => {
    const {
      sut,
      findCharacterService,
      createCharacterService,
      findClassService,
    } = makeSUT()
    const { character, params, classData } = mockData()

    findCharacterService.find.mockResolvedValue(null)
    createCharacterService.create.mockResolvedValue(character)
    findClassService.find.mockResolvedValue(classData)

    jest.spyOn(calculate, 'calculateHP').mockReturnValue(10)

    const result = await sut.execute(params)
    const expectedHP = 10 * params.level
    expect(createCharacterService.create).toHaveBeenCalledWith({
      ...params,
      hitPoints: expectedHP,
      maxHitPoints: expectedHP,
    })
    expect(result).toEqual(character)
  })

  it('should validate level is between 1 and 20', async () => {
    const { sut } = makeSUT()
    const params = {
      name: 'Test Character',
      level: 21,
      classID: 'class-id',
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      spells: [],
    }

    await expect(sut.execute(params)).rejects.toThrow(
      'Character Level must be between 1 and 20',
    )
  })

  it('should validate attributes are within valid range', async () => {
    const { sut } = makeSUT()
    const params = {
      name: 'Test Character',
      level: 1,
      classID: 'class-id',
      strength: 30, // Invalid attribute
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      spells: [],
    }

    await expect(sut.execute(params)).rejects.toThrow(
      'Strength must be between 1 and 20',
    )
  })
})
