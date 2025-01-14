import { ClassUpdater, ClassUpdaterParams } from '.'
import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/entities/Class/mock'
import { LogErrorRepositoryParams } from 'app/repositories/loggers/LogError/pino/factory'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockClassUpdaterParams } from './mock'
import { mockUpdateClassRepository } from 'app/repositories/classes/UpdateClass/mock'
import { UpdateClassRepositoryParams } from 'app/repositories/classes/UpdateClass'

const makeSUT = () => {
  const repository = mockUpdateClassRepository()
  const logger = mockLogErrorRepository()
  const sut = new ClassUpdater(repository, logger)
  const id = faker.string.uuid()

  return { sut, repository, logger, id }
}

describe('ClassUpdater', () => {
  it('should call repository with right params', () => {
    const { sut, repository, id } = makeSUT()

    const params: ClassUpdaterParams = mockClassUpdaterParams()
    sut.update(id, params)

    const expectedParams: UpdateClassRepositoryParams = {
      data: {
        name: params.name,
      },
      include: {
        subclasses: true,
      },
    }
    expect(repository.update).toHaveBeenCalledWith(id, expectedParams)
  })

  it('should return updated character class', async () => {
    const { sut, repository, id } = makeSUT()

    const params: ClassUpdaterParams = {
      name: faker.lorem.word(),
    }
    const expectedClass = { ...mockClass(), name: params.name }
    repository.update.mockResolvedValue(expectedClass)
    const updatedClass = await sut.update(id, params)

    expect(updatedClass).toEqual(expectedClass)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository, id } = makeSUT()
    const error = new Error('unexpected error')
    repository.update.mockRejectedValue(error)

    const promise = sut.update(id, mockClassUpdaterParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger, id } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.update.mockRejectedValue(error)

    try {
      await sut.update(id, mockClassUpdaterParams())
    } catch (error) {}

    const loggerRepoParams: LogErrorRepositoryParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
