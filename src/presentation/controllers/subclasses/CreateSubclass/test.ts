import { CreateSubclassController } from '.'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import {
  mockCreateSubclassService,
  mockCreateSubclassServiceParams,
} from 'domain/entities/Subclass/services/CreateSubclass/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockCreateSubclassServiceParams()
  const createdSubclass = {
    ...mockSubclass(),
    ...params,
  }

  return { params, createdSubclass }
}

const makeSUT = () => {
  const subclassCreater = mockCreateSubclassService()
  const subclassCreateSpy = jest.spyOn(subclassCreater, 'create')
  const dataValidation = mockDataValidator()

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new CreateSubclassController(
    subclassCreater,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    subclassCreater,
    dataValidation,
    subclassCreateSpy,
    httpErrorHandlerSpy,
  }
}

describe('SubclassCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, subclassCreater } = makeSUT()
    const subclassToCreate = mockCreateSubclassServiceParams()

    await sut.handle(subclassToCreate)
    expect(subclassCreater.create).toHaveBeenCalledWith(subclassToCreate)
  })

  it('should return 201 and the created subclass', async () => {
    const { sut, subclassCreateSpy } = makeSUT()
    const { params, createdSubclass } = mockData()

    subclassCreateSpy.mockResolvedValue(createdSubclass)
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(createdSubclass)
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

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(adaptValidationErrors(errors))
  })

  it('should call error handler when error happens', async () => {
    const { sut, subclassCreateSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    subclassCreateSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
