import { mockSubclass } from 'domain/entities/Subclass/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import { FindSubclassController } from '.'
import {
  mockFindSubclassRepository,
  mockFindSubclassRepositoryParams,
} from 'domain/entities/Subclass/repositories/FindSubclass/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockFindSubclassRepositoryParams()
  const foundSubclass = mockSubclass()

  return { params, foundSubclass }
}

const makeSUT = () => {
  const findSubclassRepo = mockFindSubclassRepository()
  const findSubclassSpy = jest.spyOn(findSubclassRepo, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindSubclassController(findSubclassRepo, httpErrorHandler)

  return { sut, findSubclassRepo, findSubclassSpy, httpErrorHandlerSpy }
}

describe('SubclassFinder', () => {
  it('should call find with right params', async () => {
    const { sut, findSubclassRepo } = makeSUT()

    const params = mockFindSubclassRepositoryParams()
    await sut.handle(params)

    expect(findSubclassRepo.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findSubclassSpy } = makeSUT()

    const foundSubclass = mockSubclass()
    findSubclassSpy.mockResolvedValue(foundSubclass)

    const params = mockFindSubclassRepositoryParams()
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundSubclass)
  })

  it('should call error handler when error happens', async () => {
    const { sut, findSubclassSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findSubclassSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
