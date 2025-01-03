import { mockSubclassCreaterRepo } from 'app/repositories/subclasses/SubclassCreaterRepo/mock'
import { SubclassCreater, SubclassCreaterParams } from '.'
import { faker } from '@faker-js/faker'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import { ErrorLoggerRepoParams } from 'app/repositories/loggers/ErrorLoggerRepo'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'
import { mockSubclassCreaterParams } from './mock'
import { SubclassCreaterRepoParams } from 'app/repositories/subclasses/SubclassCreaterRepo'

const makeSUT = () => {
  const repository = mockSubclassCreaterRepo()
  const logger = mockErrorLoggerRepo()
  const sut = new SubclassCreater(repository, logger)

  return { sut, repository, logger }
}

describe('SubclassCreater', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: SubclassCreaterParams = mockSubclassCreaterParams()
    sut.create(params)

    const expectedParams: SubclassCreaterRepoParams = {
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

    const loggerRepoParams: ErrorLoggerRepoParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
