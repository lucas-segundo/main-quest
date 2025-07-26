import { UpdateClassController, UpdateClassControllerParams } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { mockUpdateClassService } from 'domain/entities/Class/services/UpdateClass/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const dataToUpdate: UpdateClassControllerParams = {
    name: faker.person.jobTitle(),
  }

  return { dataToUpdate }
}

const makeSUT = () => {
  const classUpdater = mockUpdateClassService()
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
  it('should return 200 and the updated class', async () => {
    const { sut, classUpdater, updateClassSpy } = makeSUT()
    const { dataToUpdate } = mockData()

    const updatedClass = {
      ...mockClass(),
      ...dataToUpdate,
    }

    updateClassSpy.mockResolvedValue(updatedClass)

    const id = faker.string.uuid()
    const response = (await sut.handle(id, dataToUpdate)) as HTTPResponse

    expect(classUpdater.update).toHaveBeenCalledWith(id, {
      data: dataToUpdate,
    })
    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(updatedClass)
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()
    const { dataToUpdate } = mockData()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const response = (await sut.handle(
      faker.string.uuid(),
      dataToUpdate,
    )) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(adaptValidationErrors(errors))
  })

  it('should call error handler when error happens', async () => {
    const { sut, updateClassSpy, httpErrorHandlerSpy } = makeSUT()
    const { dataToUpdate } = mockData()

    const error = new Error('any_error')
    updateClassSpy.mockRejectedValue(error)
    await sut.handle(faker.string.uuid(), dataToUpdate)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
