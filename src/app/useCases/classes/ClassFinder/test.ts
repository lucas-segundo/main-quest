import { mockClassFinderRepo } from 'app/interfaces/classes/ClassFinderRepo/mock'
import { ClassFinder, ClassFinderParams } from '.'
import { faker } from '@faker-js/faker'
import { ClassFinderRepoParams } from 'app/interfaces/classes/ClassFinderRepo'
import { mockClass } from 'domain/entities/Class/mock'
import { ErrorLoggerRepoParams } from 'app/interfaces/loggers/ErrorLoggerRepo'
import { mockErrorLoggerRepo } from 'app/interfaces/loggers/ErrorLoggerRepo/mock'
import { mockClassFinderParams } from './mock'

const makeSUT = () => {
  const repository = mockClassFinderRepo()
  const logger = mockErrorLoggerRepo()
  const sut = new ClassFinder(repository, logger)

  return { sut, repository, logger }
}

describe('ClassFinder', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: ClassFinderParams = mockClassFinderParams()
    sut.find(params)

    const expectedParams: ClassFinderRepoParams = {
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

    const loggerRepoParams: ErrorLoggerRepoParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
