import { mockClassUpdaterRepo } from 'app/interfaces/ClassUpdaterRepo/mock'
import { ClassUpdater, ClassUpdaterParams } from '.'
import { faker } from '@faker-js/faker'
import { ClassUpdaterRepoParams } from 'app/interfaces/ClassUpdaterRepo'
import { mockClass } from 'domain/entities/Class/mock'
import { ErrorLoggerRepoParams } from 'app/interfaces/ErrorLoggerRepo'
import { mockErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo/mock'
import { mockClassUpdaterParams } from './mock'

const makeSUT = () => {
  const repository = mockClassUpdaterRepo()
  const logger = mockErrorLoggerRepo()
  const sut = new ClassUpdater(repository, logger)

  return { sut, repository, logger }
}

describe('ClassUpdater', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: ClassUpdaterParams = mockClassUpdaterParams()
    sut.update(params)

    const expectedParams: ClassUpdaterRepoParams = {
      name: params.name,
    }
    expect(repository.update).toHaveBeenCalledWith(expectedParams)
  })

  it('should return updated character class', async () => {
    const { sut, repository } = makeSUT()

    const params: ClassUpdaterParams = {
      name: faker.lorem.word(),
    }
    const expectedClass = { ...mockClass(), name: params.name }
    repository.update.mockResolvedValue(expectedClass)
    const updatedClass = await sut.update(params)

    expect(updatedClass).toEqual(expectedClass)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository } = makeSUT()
    const error = new Error('unexpected error')
    repository.update.mockRejectedValue(error)

    const promise = sut.update(mockClassUpdaterParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.update.mockRejectedValue(error)

    try {
      await sut.update(mockClassUpdaterParams())
    } catch (error) {}

    const loggerRepoParams: ErrorLoggerRepoParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
