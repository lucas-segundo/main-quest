import { FindCharactersController } from '.'
import { mockCharacter } from 'domain/entities/Character/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockFindCharactersService } from 'domain/entities/Character/services/FindCharacters/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'

const mockData = () => {
  const params = {
    name: {
      lk: faker.lorem.word(),
    },
  }
  const foundCharacter = mockCharacter()

  return { params, foundCharacter }
}

const makeSUT = () => {
  const findCharacters = mockFindCharactersService()
  const findCharactersSpy = jest.spyOn(findCharacters, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  dataValidation.validate.mockResolvedValue({
    errors: [],
  })

  const sut = new FindCharactersController(
    findCharacters,
    httpErrorHandler,
    dataValidation,
  )

  return {
    sut,
    findCharacters,
    findCharactersSpy,
    httpErrorHandlerSpy,
    dataValidation,
  }
}

describe('CharactersFinder', () => {
  it('should call find with right params', async () => {
    const { params } = mockData()
    const { sut, findCharacters } = makeSUT()

    await sut.handle(params)

    expect(findCharacters.find).toHaveBeenCalledWith({
      filter: {
        name: {
          lk: params.name?.lk,
        },
      },
    })
  })

  it('should return 200 and the entity', async () => {
    const { params, foundCharacter } = mockData()
    const { sut, findCharactersSpy } = makeSUT()

    findCharactersSpy.mockResolvedValue([foundCharacter])

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(HTTPStatusCode.OK)
    expect(response.data).toEqual([foundCharacter])
  })

  it('should call error handler when error happens', async () => {
    const { sut, findCharactersSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findCharactersSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
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
