import { ClassCreater, ClassCreaterParams } from '.'
import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/entities/Class/mock'
import { mockClassCreaterParams } from './mock'
import { mockCreateClassRepository } from 'domain/entities/Class/repositories/CreateClass/mock'
import { CreateClassRepositoryParams } from 'domain/entities/Class/repositories/CreateClass'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogError/mock'
import { LogErrorRepositoryParams } from 'app/repositories/loggers/LogError'

const makeSUT = () => {
  const repository = mockCreateClassRepository()
  const logger = mockLogErrorRepository()
  const sut = new ClassCreater(repository, logger)

  return { sut, repository, logger }
}

describe('ClassCreater', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: ClassCreaterParams = mockClassCreaterParams()
    sut.create(params)

    const expectedParams: CreateClassRepositoryParams = {
      name: params.name,
    }
    expect(repository.create).toHaveBeenCalledWith(expectedParams)
  })

  it('should return created character class', async () => {
    const { sut, repository } = makeSUT()

    const params: ClassCreaterParams = {
      name: faker.lorem.word(),
    }
    const expectedClass = { ...mockClass(), name: params.name }
    repository.create.mockResolvedValue(expectedClass)
    const createdClass = await sut.create(params)

    expect(createdClass).toEqual(expectedClass)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository } = makeSUT()
    const error = new Error('unexpected error')
    repository.create.mockRejectedValue(error)

    const promise = sut.create(mockClassCreaterParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.create.mockRejectedValue(error)

    try {
      await sut.create(mockClassCreaterParams())
    } catch (error) {}

    const loggerRepoParams: LogErrorRepositoryParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
