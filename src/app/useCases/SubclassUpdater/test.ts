import { SubclassUpdater, SubclassUpdaterParams } from '.'
import { faker } from '@faker-js/faker'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import { ErrorLoggerRepoParams } from 'app/interfaces/ErrorLoggerRepo'
import { mockErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo/mock'
import { mockSubclassUpdaterParams } from './mock'
import { mockSubclassUpdaterRepo } from 'app/interfaces/SubclassUpdaterRepo/mock'
import { SubclassUpdaterRepoParams } from 'app/interfaces/SubclassUpdaterRepo'

const makeSUT = () => {
  const repository = mockSubclassUpdaterRepo()
  const logger = mockErrorLoggerRepo()
  const sut = new SubclassUpdater(repository, logger)
  const id = faker.string.uuid()

  return { sut, repository, logger, id }
}

describe('SubclassUpdater', () => {
  it('should call repository with right params', () => {
    const { sut, repository, id } = makeSUT()

    const params: SubclassUpdaterParams = mockSubclassUpdaterParams()
    sut.update(id, params)

    const expectedParams: SubclassUpdaterRepoParams = {
      data: {
        name: params.name,
      },
    }
    expect(repository.update).toHaveBeenCalledWith(id, expectedParams)
  })

  it('should return updated character class', async () => {
    const { sut, repository, id } = makeSUT()

    const params: SubclassUpdaterParams = {
      name: faker.lorem.word(),
    }
    const expectedSubclass = { ...mockSubclass(), name: params.name }
    repository.update.mockResolvedValue(expectedSubclass)
    const updatedSubclass = await sut.update(id, params)

    expect(updatedSubclass).toEqual(expectedSubclass)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository, id } = makeSUT()
    const error = new Error('unexpected error')
    repository.update.mockRejectedValue(error)

    const promise = sut.update(id, mockSubclassUpdaterParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger, id } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.update.mockRejectedValue(error)

    try {
      await sut.update(id, mockSubclassUpdaterParams())
    } catch (error) {}

    const loggerRepoParams: ErrorLoggerRepoParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
