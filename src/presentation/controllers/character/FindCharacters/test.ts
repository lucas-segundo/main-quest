import { FindCharactersController } from '.'
import { mockCharacter } from 'domain/entities/Character/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { RequiredParamError } from 'app/errors/RequiredParamError'
import {
  mockFindCharactersService,
  mockFindCharactersServiceParams,
} from 'domain/entities/Character/services/FindCharacters/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'

const mockData = () => {
  const params = mockFindCharactersServiceParams()
  const foundCharacter = mockCharacter()

  return { params, foundCharacter }
}

const makeSUT = () => {
  const findCharacters = mockFindCharactersService()
  const findCharactersSpy = jest.spyOn(findCharacters, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindCharactersController(findCharacters, httpErrorHandler)

  return { sut, findCharacters, findCharactersSpy, httpErrorHandlerSpy }
}

describe('CharactersFinder', () => {
  it('should call find with right params', async () => {
    const { sut, findCharacters } = makeSUT()

    const params = mockFindCharactersServiceParams()
    await sut.handle(params)

    expect(findCharacters.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the entity', async () => {
    const { sut, findCharactersSpy } = makeSUT()

    const foundCharacter = mockCharacter()
    findCharactersSpy.mockResolvedValue([foundCharacter])

    const params = mockFindCharactersServiceParams()
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(HTTPStatusCode.OK)
    expect(response.data).toEqual([foundCharacter])
  })

  it('should return 400 if no entity filter is provided', async () => {
    const { sut } = makeSUT()
    const params: any = {}
    const response = (await sut.handle(params)) as HTTPErrorResponse

    const error = new RequiredParamError('filter')
    expect(response.statusCode).toBe(HTTPStatusCode.BAD_REQUEST)
    expect(response.errors).toEqual([
      {
        code: error.code,
        message: error.message,
      },
    ])
  })

  it('should call error handler when error happens', async () => {
    const { sut, findCharactersSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findCharactersSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
