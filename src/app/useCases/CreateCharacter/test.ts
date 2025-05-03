import { CreateCharacterUseCase } from '.'
import { UniqueError } from 'app/errors/UniqueErro'
import { Character } from 'entities/Character'
import {
  CreateCharacterRepository,
  CreateCharacterRepositoryParams,
} from 'entities/Character/repositories/CreateCharacter'
import { FindCharacterRepository } from 'entities/Character/repositories/FindCharacter'

const mockCharacter: Character = {
  id: '1',
  name: 'Test Character',
  classID: '1',
  level: 1,
}

const mockCreateCharacterRepositoryParams: CreateCharacterRepositoryParams = {
  name: 'Test Character',
  classID: '1',
  level: 1,
}

const makeSUT = () => {
  const createCharacterRepository: jest.Mocked<CreateCharacterRepository> = {
    create: jest.fn(),
  }

  const findCharacterRepository: jest.Mocked<FindCharacterRepository> = {
    find: jest.fn(),
  }

  const sut = new CreateCharacterUseCase(
    createCharacterRepository,
    findCharacterRepository,
  )

  return { sut, createCharacterRepository, findCharacterRepository }
}

describe('CreateCharacterUseCase', () => {
  it('should throw UniqueError if character already exists', async () => {
    const { sut, findCharacterRepository } = makeSUT()
    findCharacterRepository.find.mockResolvedValue(mockCharacter)

    await expect(
      sut.execute({ character: mockCreateCharacterRepositoryParams }),
    ).rejects.toThrow(UniqueError)

    expect(findCharacterRepository.find).toHaveBeenCalledWith({
      filter: { name: { like: mockCreateCharacterRepositoryParams.name } },
    })
  })

  it('should call createCharacterRepository with correct params if character does not exist', async () => {
    const { sut, findCharacterRepository, createCharacterRepository } =
      makeSUT()
    findCharacterRepository.find.mockResolvedValue(null)
    createCharacterRepository.create.mockResolvedValue(mockCharacter)

    const result = await sut.execute({
      character: mockCreateCharacterRepositoryParams,
    })

    expect(createCharacterRepository.create).toHaveBeenCalledWith(
      mockCreateCharacterRepositoryParams,
    )
    expect(result).toEqual(mockCharacter)
  })
})
