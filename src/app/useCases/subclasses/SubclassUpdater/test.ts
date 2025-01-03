import { SubclassUpdater, SubclassUpdaterParams } from '.'
import { faker } from '@faker-js/faker'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import { LogErrorRepositoryParams } from 'app/repositories/loggers/LogError/pino/factory'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockSubclassUpdaterParams } from './mock'
import { mockUpdateSubclassRepository } from 'app/repositories/subclasses/UpdateSubclassRepository/mock'
import { UpdateSubclassRepositoryParams } from 'app/repositories/subclasses/UpdateSubclassRepository'

const makeSUT = () => {
  const repository = mockUpdateSubclassRepository()
  const logger = mockLogErrorRepository()
  const sut = new SubclassUpdater(repository, logger)
  const id = faker.string.uuid()

  return { sut, repository, logger, id }
}

describe('SubclassUpdater', () => {
  it('should call repository with right params', () => {
    const { sut, repository, id } = makeSUT()

    const params: SubclassUpdaterParams = mockSubclassUpdaterParams()
    sut.update(id, params)

    const expectedParams: UpdateSubclassRepositoryParams = {
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

    const loggerRepoParams: LogErrorRepositoryParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
