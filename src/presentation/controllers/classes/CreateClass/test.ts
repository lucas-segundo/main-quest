import { CreateClassController } from '.'
import { mockClass } from 'entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import {
  mockCreateClassService,
  mockCreateClassServiceParams,
} from 'entities/Class/services/CreateClass/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockCreateClassServiceParams()
  const createdClass = {
    ...mockClass(),
    ...params,
  }

  return { params, createdClass }
}

const makeSUT = () => {
  const classCreater = mockCreateClassService()
  const createClassSpy = jest.spyOn(classCreater, 'create')
  const dataValidation = mockDataValidator()

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new CreateClassController(
    classCreater,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    classCreater,
    createClassSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('ClassCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, classCreater } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(classCreater.create).toHaveBeenCalledWith(params)
  })

  it('should return 201 and the created character class', async () => {
    const { sut, createClassSpy } = makeSUT()
    const { params, createdClass } = mockData()

    createClassSpy.mockResolvedValue(createdClass)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(createdClass)
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
    const { sut, createClassSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    createClassSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
