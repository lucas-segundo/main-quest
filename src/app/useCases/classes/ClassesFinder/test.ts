import { ClassesFinder, ClassesFinderParams } from '.'
import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/entities/Class/mock'
import { LogErrorRepositoryParams } from 'app/repositories/loggers/LogError/pino/factory'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockClassesFinderParams } from './mock'
import { mockFindClassesRepository } from 'domain/entities/Class/repositories/FindClasses/mock'
import { FindClassesRepositoryParams } from 'domain/entities/Class/repositories/FindClasses'

const makeSUT = () => {
  const repository = mockFindClassesRepository()
  const logger = mockLogErrorRepository()
  const sut = new ClassesFinder(repository, logger)

  return { sut, repository, logger }
}

describe('ClassesFinder', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: ClassesFinderParams = mockClassesFinderParams()
    sut.find(params)

    const expectedParams: FindClassesRepositoryParams = {
      filter: params,
      include: {
        subclasses: true,
      },
    }
    expect(repository.find).toHaveBeenCalledWith(expectedParams)
  })

  it('should return find classes', async () => {
    const { sut, repository } = makeSUT()

    const params = mockClassesFinderParams()
    const expectedClasses = [mockClass()]
    repository.find.mockResolvedValue(expectedClasses)
    const classes = await sut.find(params)

    expect(classes).toEqual(expectedClasses)
  })

  it('should throw unexpected error if something wrong happens', () => {
    const { sut, repository } = makeSUT()
    const error = new Error('unexpected error')
    repository.find.mockRejectedValue(error)

    const promise = sut.find(mockClassesFinderParams())
    expect(promise).rejects.toThrow(error)
  })

  it('should call logger with right params when error happens', async () => {
    const { sut, repository, logger } = makeSUT()

    const error = new Error(faker.lorem.sentence())
    repository.find.mockRejectedValue(error)

    try {
      await sut.find(mockClassesFinderParams())
    } catch (error) {}

    const loggerRepoParams: LogErrorRepositoryParams = {
      error,
    }
    expect(logger.log).toHaveBeenCalledWith(loggerRepoParams)
  })
})
