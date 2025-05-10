import { CreateCharacterUseCase } from '.'
import { UniqueError } from 'app/errors/UniqueErro'
import { mockCharacter } from 'entities/Character/mock'
import {
  mockCreateCharacterRepository,
  mockCreateCharacterRepositoryParams,
} from 'entities/Character/repositories/CreateCharacter/mock'
import { mockFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/mock'
import { makeCalculateHPUseCase } from '../CalculateHP/factory'
import { mockFindClassRepository } from 'entities/Class/repositories/FindClass/mock'
import { mockClass } from 'entities/Class/mock'

const mockData = () => {
  const character = mockCharacter()
  const params = mockCreateCharacterRepositoryParams()
  const classData = mockClass()

  return { character, params, classData }
}

const makeSUT = () => {
  const createCharacterRepository = mockCreateCharacterRepository()
  const findCharacterRepository = mockFindCharacterRepository()
  const findClassRepository = mockFindClassRepository()
  const calculateHPUseCase = makeCalculateHPUseCase()

  const sut = new CreateCharacterUseCase(
    createCharacterRepository,
    findCharacterRepository,
    findClassRepository,
    calculateHPUseCase,
  )

  return {
    sut,
    createCharacterRepository,
    findCharacterRepository,
    findClassRepository,
    calculateHPUseCase,
  }
}

describe('CreateCharacterUseCase', () => {
  it('should throw UniqueError if character already exists', async () => {
    const { sut, findCharacterRepository, findClassRepository } = makeSUT()
    const { character, params, classData } = mockData()

    findCharacterRepository.find.mockResolvedValue(character)
    findClassRepository.find.mockResolvedValue(classData)

    await expect(sut.execute(params)).rejects.toThrow(UniqueError)

    expect(findCharacterRepository.find).toHaveBeenCalledWith({
      filter: { name: { like: params.name } },
    })
  })

  it('should call createCharacterRepository with correct params if character does not exist', async () => {
    const {
      sut,
      findCharacterRepository,
      createCharacterRepository,
      findClassRepository,
      calculateHPUseCase,
    } = makeSUT()
    const { character, params, classData } = mockData()

    findCharacterRepository.find.mockResolvedValue(null)
    createCharacterRepository.create.mockResolvedValue(character)
    findClassRepository.find.mockResolvedValue(classData)

    params.hitPoints = 30
    params.maxHitPoints = 30
    jest.spyOn(calculateHPUseCase, 'execute').mockReturnValue(30)

    const result = await sut.execute(params)

    expect(createCharacterRepository.create).toHaveBeenCalledWith(params)
    expect(result).toEqual(character)
  })
})
