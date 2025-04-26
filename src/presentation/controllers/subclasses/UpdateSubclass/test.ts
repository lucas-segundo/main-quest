import { UpdateSubclassController, UpdateSubclassControllerParams } from '.'
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
  mockUpdateSubclassRepository,
  mockUpdateSubclassRepositoryParams,
} from 'domain/entities/Subclass/repositories/UpdateSubclass/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const dataToUpdate = mockUpdateSubclassRepositoryParams()

  const params: UpdateSubclassControllerParams = {
    id: faker.string.uuid(),
    data: dataToUpdate,
  }

  return { dataToUpdate, params }
}

const makeSUT = () => {
  const subclassUpdater = mockUpdateSubclassRepository()
  const updateSubclassSpy = jest.spyOn(subclassUpdater, 'update')
  const dataValidation = mockDataValidator()

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new UpdateSubclassController(
    subclassUpdater,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    subclassUpdater,
    updateSubclassSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('SubclassUpdater', () => {
  it('should call updater with right params', async () => {
    const { sut, subclassUpdater } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(subclassUpdater.update).toHaveBeenCalledWith(params.id, params.data)
  })

  it('should return 201 and the updated character class', async () => {
    const { sut, updateSubclassSpy } = makeSUT()
    const { dataToUpdate, params } = mockData()

    const updatedSubclass = {
      ...mockSubclass(),
      ...dataToUpdate,
    }

    updateSubclassSpy.mockResolvedValue(updatedSubclass)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(updatedSubclass)
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
    const { sut, updateSubclassSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    updateSubclassSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
