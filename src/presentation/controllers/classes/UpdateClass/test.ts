import { UpdateClassController, UpdateClassControllerParams } from '.'
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
  mockUpdateClassRepository,
  mockUpdateClassRepositoryParams,
} from 'entities/Class/repositories/UpdateClass/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const dataToUpdate = mockUpdateClassRepositoryParams()

  const params: UpdateClassControllerParams = {
    id: faker.string.uuid(),
    data: dataToUpdate,
  }

  return { dataToUpdate, params }
}

const makeSUT = () => {
  const classUpdater = mockUpdateClassRepository()
  const updateClassSpy = jest.spyOn(classUpdater, 'update')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  const sut = new UpdateClassController(
    classUpdater,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    classUpdater,
    updateClassSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('ClassUpdater', () => {
  it('should call updater with right params', async () => {
    const { sut, classUpdater } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(classUpdater.update).toHaveBeenCalledWith(params.id, params.data)
  })

  it('should return 201 and the updated character class', async () => {
    const { sut, updateClassSpy } = makeSUT()
    const { dataToUpdate, params } = mockData()

    const updatedClass = {
      ...mockClass(),
      ...dataToUpdate,
    }

    updateClassSpy.mockResolvedValue(updatedClass)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(updatedClass)
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
    const { sut, updateClassSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    updateClassSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
