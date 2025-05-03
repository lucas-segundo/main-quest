import { CreateCharacterController } from '.'
import { mockCharacter } from 'entities/Character/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import {
  mockCreateCharacterRepository,
  mockCreateCharacterRepositoryParams,
} from 'entities/Character/repositories/CreateCharacter/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'

const mockData = () => {
  const params = mockCreateCharacterRepositoryParams()
  const createdCharacter = {
    ...mockCharacter(),
    ...params,
  }

  return { params, createdCharacter }
}

const makeSUT = () => {
  const classCreater = mockCreateCharacterRepository()
  const createCharacterSpy = jest.spyOn(classCreater, 'create')
  const dataValidation = mockDataValidator()

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new CreateCharacterController(
    classCreater,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    classCreater,
    createCharacterSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('CharacterCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, classCreater } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(classCreater.create).toHaveBeenCalledWith(params)
  })

  it('should return 201 and the created character class', async () => {
    const { sut, createCharacterSpy } = makeSUT()
    const { params, createdCharacter } = mockData()

    createCharacterSpy.mockResolvedValue(createdCharacter)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(HTTPStatusCode.CREATED)
    expect(response.data).toEqual(createdCharacter)
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

  it('should call error handler when error happens', async () => {
    const { sut, createCharacterSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    createCharacterSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
