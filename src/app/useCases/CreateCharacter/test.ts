import { CreateCharacterUseCase } from '.'
import { UniqueError } from 'app/errors/UniqueErro'
import { mockCharacter } from 'domain/entities/Character/mock'
import {
  mockCreateCharacterService,
  mockCreateCharacterServiceParams,
} from 'domain/entities/Character/services/CreateCharacter/mock'
import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { mockFindClassService } from 'domain/entities/Class/services/FindClass/mock'
import { mockClass } from 'domain/entities/Class/mock'
import * as calculate from 'domain/metrics/CalculateHP'

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
})
