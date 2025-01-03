import { mockCreateSubclassRepository } from 'app/repositories/subclasses/CreateSubclass/mock'
import { SubclassCreater, SubclassCreaterParams } from '.'
import { faker } from '@faker-js/faker'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import { LogErrorRepositoryParams } from 'app/repositories/loggers/LogError/pino/factory'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockSubclassCreaterParams } from './mock'
import { CreateSubclassRepositoryParams } from 'app/repositories/subclasses/CreateSubclass'

const makeSUT = () => {
  const repository = mockCreateSubclassRepository()
  const logger = mockLogErrorRepository()
  const sut = new SubclassCreater(repository, logger)

  return { sut, repository, logger }
}

describe('SubclassCreater', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: SubclassCreaterParams = mockSubclassCreaterParams()
    sut.create(params)

    const expectedParams: CreateSubclassRepositoryParams = {
      name: params.name,
      classID: params.classID,
    }
    expect(repository.create).toHaveBeenCalledWith(expectedParams)
  })

  it('should return created subclass', async () => {
    const { sut, repository } = makeSUT()

    const params: SubclassCreaterParams = mockSubclassCreaterParams()
    const expectedSubclass = { ...mockSubclass(), name: params.name }
    repository.create.mockResolvedValue(expectedSubclass)
    const createdSubclass = await sut.create(params)

    expect(createdSubclass).toEqual(expectedSubclass)
  })

  it('should throw error if something wrong happens', () => {
    const { sut, repository } = makeSUT()
    const error = new Error('unexpected error')
    repository.create.mockRejectedValue(error)

    const promise = sut.create(mockSubclassCreaterParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.create.mockRejectedValue(error)

    try {
      await sut.create(mockSubclassCreaterParams())
    } catch (error) {}

    const loggerRepoParams: LogErrorRepositoryParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
