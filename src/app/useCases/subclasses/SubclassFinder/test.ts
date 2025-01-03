import { mockSubclassFinderRepo } from 'app/repositories/subclasses/SubclassFinderRepo/mock'
import { SubclassFinder, SubclassFinderParams } from '.'
import { faker } from '@faker-js/faker'
import { SubclassFinderRepoParams } from 'app/repositories/subclasses/SubclassFinderRepo'
import { mockClass } from 'domain/entities/Class/mock'
import { LogErrorRepositoryParams } from 'app/repositories/loggers/LogError/pino/factory'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockSubclassFinderParams } from './mock'

const makeSUT = () => {
  const repository = mockSubclassFinderRepo()
  const logger = mockLogErrorRepository()
  const sut = new SubclassFinder(repository, logger)

  return { sut, repository, logger }
}

describe('SubclassFinder', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: SubclassFinderParams = mockSubclassFinderParams()
    sut.find(params)

    const expectedParams: SubclassFinderRepoParams = {
      filter: params,
    }
    expect(repository.find).toHaveBeenCalledWith(expectedParams)
  })

  it('should return subclass', async () => {
    const { sut, repository } = makeSUT()

    const params = mockSubclassFinderParams()
    const expectedClass = { ...mockClass(), id: params.id.equals }
    repository.find.mockResolvedValue(expectedClass)
    const foundClass = await sut.find(params)

    expect(foundClass).toEqual(expectedClass)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository } = makeSUT()
    const error = new Error('unexpected error')
    repository.find.mockRejectedValue(error)

    const promise = sut.find(mockSubclassFinderParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.find.mockRejectedValue(error)

    try {
      await sut.find(mockSubclassFinderParams())
    } catch (error) {}

    const loggerRepoParams: LogErrorRepositoryParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
