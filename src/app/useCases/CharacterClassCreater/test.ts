import { mockCharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository/mock'
import { CharacterClassCreaterImpl } from '.'
import { CharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater'
import { faker } from '@faker-js/faker'
import { CharacterClassCreaterRepoParams } from 'app/interfaces/CharacterClassCreaterRepository'
import { mockCharacterClass } from 'domain/entities/CharacterClass/mock'
import { mockCharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { LoggerParams } from 'app/interfaces/Logger'
import { mockLogger } from 'app/interfaces/Logger/mock'

const makeSUT = () => {
  const repository = mockCharacterClassCreaterRepo()
  const logger = mockLogger()
  const sut = new CharacterClassCreaterImpl(repository, logger)

  return { sut, repository, logger }
}

describe('CharacterClassCreaterImpl', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: CharacterClassCreaterParams =
      mockCharacterClassCreaterParams()
    sut.create(params)

    const expectedParams: CharacterClassCreaterRepoParams = {
      name: params.name,
    }
    expect(repository.create).toHaveBeenCalledWith(expectedParams)
  })

  it('should return created character class', async () => {
    const { sut, repository } = makeSUT()

    const params: CharacterClassCreaterParams = {
      name: faker.lorem.word(),
    }
    const createdCharacterClass = { ...mockCharacterClass(), name: params.name }
    repository.create.mockResolvedValue(createdCharacterClass)
    const characterClass = await sut.create(params)

    expect(characterClass).toEqual(createdCharacterClass)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository } = makeSUT()
    repository.create.mockRejectedValue(new Error('unexpected error'))

    const promise = sut.create(mockCharacterClassCreaterParams())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.create.mockRejectedValue(error)

    try {
      await sut.create(mockCharacterClassCreaterParams())
    } catch (error) {}

    const loggerParams: LoggerParams = {
      level: 'error',
      message: error.message,
      error: error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerParams)
  })
})
