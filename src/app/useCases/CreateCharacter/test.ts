import { CreateCharacterUseCase } from '.'
import { UniqueError } from 'app/errors/UniqueErro'
import { mockCharacter } from 'entities/Character/mock'
import {
  mockCreateCharacterRepository,
  mockCreateCharacterRepositoryParams,
} from 'entities/Character/repositories/CreateCharacter/mock'
import { mockFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/mock'

const mockData = () => {
  const character = mockCharacter()
  const params = mockCreateCharacterRepositoryParams()

  return { character, params }
}

const makeSUT = () => {
  const createCharacterRepository = mockCreateCharacterRepository()
  const findCharacterRepository = mockFindCharacterRepository()

  const sut = new CreateCharacterUseCase(
    createCharacterRepository,
    findCharacterRepository,
  )

  return { sut, createCharacterRepository, findCharacterRepository }
}

describe('CreateCharacterUseCase', () => {
  it('should throw UniqueError if character already exists', async () => {
    const { sut, findCharacterRepository } = makeSUT()
    const { character, params } = mockData()
    findCharacterRepository.find.mockResolvedValue(character)

    await expect(
      sut.execute({
        character: params,
      }),
    ).rejects.toThrow(UniqueError)

    expect(findCharacterRepository.find).toHaveBeenCalledWith({
      filter: { name: { like: params.name } },
    })
  })

  it('should call createCharacterRepository with correct params if character does not exist', async () => {
    const { sut, findCharacterRepository, createCharacterRepository } =
      makeSUT()
    const { character, params } = mockData()
    findCharacterRepository.find.mockResolvedValue(null)
    createCharacterRepository.create.mockResolvedValue(character)

    const result = await sut.execute({
      character: params,
    })

    expect(createCharacterRepository.create).toHaveBeenCalledWith(params)
    expect(result).toEqual(character)
  })
})
