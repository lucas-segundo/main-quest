import { FindCharacterController } from '.'
import { mockCharacter } from 'entities/Character/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockFindCharacterRepository,
  mockFindCharacterRepositoryParams,
} from 'entities/Character/repositories/FindCharacter/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'

const mockData = () => {
  const params = mockFindCharacterRepositoryParams()
  const foundCharacter = mockCharacter()

  return { params, foundCharacter }
}

const makeSUT = () => {
  const characterFinder = mockFindCharacterRepository()
  const findCharacterSpy = jest.spyOn(characterFinder, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindCharacterController(characterFinder, httpErrorHandler)

  return { sut, characterFinder, findCharacterSpy, httpErrorHandlerSpy }
}

describe('CharacterFinder', () => {
  it('should call find with right params', async () => {
    const { sut, characterFinder } = makeSUT()

    const params = mockFindCharacterRepositoryParams()
    await sut.handle(params)

    expect(characterFinder.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findCharacterSpy } = makeSUT()
    const { params, foundCharacter } = mockData()

    findCharacterSpy.mockResolvedValue(foundCharacter)
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(HTTPStatusCode.OK)
    expect(response.data).toEqual(foundCharacter)
  })

  it('should call error handler when error happens', async () => {
    const { sut, findCharacterSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findCharacterSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
