import { SubclassUpdaterController, SubclassUpdaterControllerParams } from '.'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import {
  mockSubclassUpdater,
  mockSubclassUpdaterParams,
} from 'app/useCases/SubclassUpdater/mock'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'

const makeMockedData = () => {
  const dataToUpdate = mockSubclassUpdaterParams()

  const params: SubclassUpdaterControllerParams = {
    id: faker.string.uuid(),
    data: dataToUpdate,
  }

  return { dataToUpdate, params }
}

const makeSUT = () => {
  const subclassUpdater = mockSubclassUpdater()
  const updateSubclassSpy = jest.spyOn(subclassUpdater, 'update')
  const dataValidation = mockDataValidator()
  const sut = new SubclassUpdaterController(subclassUpdater, dataValidation)

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return { sut, subclassUpdater, updateSubclassSpy, dataValidation }
}

describe('SubclassUpdater', () => {
  it('should call updater with right params', async () => {
    const { sut, subclassUpdater } = makeSUT()
    const { params } = makeMockedData()

    await sut.handle(params)

    expect(subclassUpdater.update).toHaveBeenCalledWith(params.id, params.data)
  })

  it('should return 201 and the updated character class', async () => {
    const { sut, updateSubclassSpy } = makeSUT()
    const { dataToUpdate, params } = makeMockedData()

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
    const { params } = makeMockedData()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(adaptValidationErrors(errors))
  })
})
