import { mockClassCreaterRepo } from 'app/interfaces/ClassCreaterRepository/mock'
import { ClassCreaterImpl } from '.'
import { ClassCreaterParams } from 'domain/useCases/ClassCreater'
import { faker } from '@faker-js/faker'
import { ClassCreaterRepoParams } from 'app/interfaces/ClassCreaterRepository'
import { mockClass } from 'domain/entities/Class/mock'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { ErrorLoggerRepoParams } from 'app/interfaces/ErrorLoggerRepository'
import { mockErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepository/mock'

const makeSUT = () => {
  const repository = mockClassCreaterRepo()
  const logger = mockErrorLoggerRepo()
  const sut = new ClassCreaterImpl(repository, logger)

  return { sut, repository, logger }
}

describe('ClassCreaterImpl', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: ClassCreaterParams = mockClassCreaterParams()
    sut.create(params)

    const expectedParams: ClassCreaterRepoParams = {
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
    repository.create.mockRejectedValue(new Error('unexpected error'))

    const promise = sut.create(mockClassCreaterParams())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.create.mockRejectedValue(error)

    try {
      await sut.create(mockClassCreaterParams())
    } catch (error) {}

    const loggerRepoParams: ErrorLoggerRepoParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
