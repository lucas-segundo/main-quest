import { CreateCharacterController } from '.'
import { mockCharacter } from 'domain/entities/Character/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { mockCreateCharacterServiceParams } from 'domain/entities/Character/services/CreateCharacter/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { mockCreateCharacterUserCase } from 'app/useCases/CreateCharacter/mock'

const mockData = () => {
  const params = mockCreateCharacterServiceParams()
  const createdCharacter = {
    ...mockCharacter(),
    ...params,
  }

  return { params, createdCharacter }
}

const makeSUT = () => {
  const createCharacterUseCase = mockCreateCharacterUserCase()
  const createCharacterUseCaseSpy = jest.spyOn(
    createCharacterUseCase,
    'execute',
  )
  const dataValidation = mockDataValidator()

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new CreateCharacterController(
    createCharacterUseCase,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    createCharacterUseCase,
    createCharacterUseCaseSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('CharacterCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, createCharacterUseCase } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(createCharacterUseCase.execute).toHaveBeenCalledWith(params)
  })

  it('should return 201 and the created character class', async () => {
    const { sut, createCharacterUseCaseSpy } = makeSUT()
    const { params, createdCharacter } = mockData()

    createCharacterUseCaseSpy.mockResolvedValue(createdCharacter)

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
    const { sut, createCharacterUseCaseSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    createCharacterUseCaseSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
