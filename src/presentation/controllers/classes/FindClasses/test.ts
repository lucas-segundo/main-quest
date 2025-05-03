import { FindClassesController } from '.'
import { mockClass } from 'entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { RequiredParamError } from 'app/errors/RequiredParamError'
import {
  mockFindClassesRepository,
  mockFindClassesRepositoryParams,
} from 'entities/Class/repositories/FindClasses/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockFindClassesRepositoryParams()
  const foundClass = mockClass()

  return { params, foundClass }
}

const makeSUT = () => {
  const findClasses = mockFindClassesRepository()
  const findClassesSpy = jest.spyOn(findClasses, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindClassesController(findClasses, httpErrorHandler)

  return { sut, findClasses, findClassesSpy, httpErrorHandlerSpy }
}

describe('ClassesFinder', () => {
  it('should call find with right params', async () => {
    const { sut, findClasses } = makeSUT()

    const params = mockFindClassesRepositoryParams()
    await sut.handle(params)

    expect(findClasses.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the classes', async () => {
    const { sut, findClassesSpy } = makeSUT()

    const foundClass = mockClass()
    findClassesSpy.mockResolvedValue([foundClass])

    const params = mockFindClassesRepositoryParams()
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([foundClass])
  })

  it('should return 400 if no class filter is provided', async () => {
    const { sut } = makeSUT()
    const params: any = {}
    const response = (await sut.handle(params)) as HTTPErrorResponse

    const error = new RequiredParamError('filter')
    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual([
      {
        code: error.code,
        message: error.message,
      },
    ])
  })

  it('should call error handler when error happens', async () => {
    const { sut, findClassesSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findClassesSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
