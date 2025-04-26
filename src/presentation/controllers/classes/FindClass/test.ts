import { FindClassController } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockFindClassRepository,
  mockFindClassRepositoryParams,
} from 'domain/entities/Class/repositories/FindClass/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockFindClassRepositoryParams()
  const foundClass = mockClass()

  return { params, foundClass }
}

const makeSUT = () => {
  const classFinder = mockFindClassRepository()
  const findClassSpy = jest.spyOn(classFinder, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindClassController(classFinder, httpErrorHandler)

  return { sut, classFinder, findClassSpy, httpErrorHandlerSpy }
}

describe('ClassFinder', () => {
  it('should call find with right params', async () => {
    const { sut, classFinder } = makeSUT()

    const params = mockFindClassRepositoryParams()
    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findClassSpy } = makeSUT()
    const { params, foundClass } = mockData()

    findClassSpy.mockResolvedValue(foundClass)
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundClass)
  })

  it('should call error handler when error happens', async () => {
    const { sut, findClassSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findClassSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
