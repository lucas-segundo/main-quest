import { CreateCharacterUseCase } from '.'
import { UniqueError } from 'app/errors/UniqueErro'
import { mockCharacter } from 'domain/entities/Character/mock'
import {
  mockCreateCharacterService,
  mockCreateCharacterServiceParams,
} from 'domain/entities/Character/services/CreateCharacter/mock'
import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { makeCalculateHPUseCase } from '../CalculateHP/factory'
import { mockFindClassService } from 'domain/entities/Class/services/FindClass/mock'
import { mockClass } from 'domain/entities/Class/mock'

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
  const calculateHPUseCase = makeCalculateHPUseCase()

  const sut = new CreateCharacterUseCase(
    createCharacterService,
    findCharacterService,
    findClassService,
    calculateHPUseCase,
  )

  return {
    sut,
    createCharacterService,
    findCharacterService,
    findClassService,
    calculateHPUseCase,
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
      calculateHPUseCase,
    } = makeSUT()
    const { character, params, classData } = mockData()

    findCharacterService.find.mockResolvedValue(null)
    createCharacterService.create.mockResolvedValue(character)
    findClassService.find.mockResolvedValue(classData)

    params.hitPoints = 30
    params.maxHitPoints = 30
    jest.spyOn(calculateHPUseCase, 'execute').mockReturnValue(30)

    const result = await sut.execute(params)

    expect(createCharacterService.create).toHaveBeenCalledWith(params)
    expect(result).toEqual(character)
  })
})
