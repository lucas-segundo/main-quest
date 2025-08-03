import { FindCharacterController, FindCharacterControllerParams } from '.'
import { mockCharacter } from 'domain/entities/Character/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { faker } from '@faker-js/faker'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'

const mockData = () => {
  const params: FindCharacterControllerParams = {
    id: faker.string.uuid(),
  }
  const foundCharacter = mockCharacter()

  return { params, foundCharacter }
}

const makeSUT = () => {
  const characterFinder = mockFindCharacterService()
  const findCharacterSpy = jest.spyOn(characterFinder, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  dataValidation.validate.mockResolvedValue({
    errors: [],
  })

  const sut = new FindCharacterController(
    characterFinder,
    httpErrorHandler,
    dataValidation,
  )

  return {
    sut,
    characterFinder,
    findCharacterSpy,
    httpErrorHandlerSpy,
    dataValidation,
  }
}

describe('CharacterFinder', () => {
  it('should call find with right params', async () => {
    const { sut, characterFinder } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(characterFinder.find).toHaveBeenCalledWith({
      filter: {
        id: {
          eq: params.id,
        },
      },
    })
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

  it('should return 404 if character is not found', async () => {
    const { sut, findCharacterSpy } = makeSUT()
    const { params } = mockData()

    findCharacterSpy.mockResolvedValue(null)
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(HTTPStatusCode.NOT_FOUND)
    expect(response.data).toBeNull()
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()
    const { params } = mockData()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(HTTPStatusCode.BAD_REQUEST)
    expect(response.errors).toEqual(adaptValidationErrors(errors))
  })
})
