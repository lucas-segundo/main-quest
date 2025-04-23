import { ClassFinder, ClassFinderParams } from '.'
import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/entities/Class/mock'
import { LogErrorRepositoryParams } from 'app/repositories/loggers/LogError/pino/factory'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockClassFinderParams } from './mock'
import { mockFindClassRepository } from 'domain/entities/Class/repositories/FindClass/mock'
import { FindClassRepositoryParams } from 'domain/entities/Class/repositories/FindClass'

const makeSUT = () => {
  const repository = mockFindClassRepository()
  const logger = mockLogErrorRepository()
  const sut = new ClassFinder(repository, logger)

  return { sut, repository, logger }
}

describe('ClassFinder', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: ClassFinderParams = mockClassFinderParams()
    sut.find(params)

    const expectedParams: FindClassRepositoryParams = {
      filter: params,
      include: {
        subclasses: true,
      },
    }
    expect(repository.find).toHaveBeenCalledWith(expectedParams)
  })

  it('should return find class', async () => {
    const { sut, repository } = makeSUT()

    const params = mockClassFinderParams()
    const expectedClass = { ...mockClass(), id: params.id.equals }
    repository.find.mockResolvedValue(expectedClass)
    const foundClass = await sut.find(params)

    expect(foundClass).toEqual(expectedClass)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository } = makeSUT()
    const error = new Error('unexpected error')
    repository.find.mockRejectedValue(error)

    const promise = sut.find(mockClassFinderParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.find.mockRejectedValue(error)

    try {
      await sut.find(mockClassFinderParams())
    } catch (error) {}

    const loggerRepoParams: LogErrorRepositoryParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
