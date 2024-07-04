import { SubclassCreaterController, SubclassCreaterControllerParams } from '.'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import {
  mockSubclassCreater,
  mockSubclassCreaterParams,
} from 'app/useCases/SubclassCreater/mock'

const makeSUT = () => {
  const subclassCreater = mockSubclassCreater()
  const subclassCreateSpy = jest.spyOn(subclassCreater, 'create')
  const dataValidation = mockDataValidator()
  const sut = new SubclassCreaterController(subclassCreater, dataValidation)

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return { sut, subclassCreater, dataValidation, subclassCreateSpy }
}

describe('SubclassCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, subclassCreater } = makeSUT()
    const subclassToCreate = mockSubclassCreaterParams()

    const params: SubclassCreaterControllerParams = {
      data: subclassToCreate,
    }

    await sut.handle(params)

    expect(subclassCreater.create).toHaveBeenCalledWith(subclassToCreate)
  })

  it('should return 201 and the created subclass', async () => {
    const { sut, subclassCreateSpy } = makeSUT()

    const subclassToCreate = mockSubclassCreaterParams()
    const createdSubclass = {
      ...mockSubclass(),
      ...subclassToCreate,
    }

    subclassCreateSpy.mockResolvedValue(createdSubclass)

    const params: SubclassCreaterControllerParams = {
      data: subclassToCreate,
    }

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(createdSubclass)
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const params: SubclassCreaterControllerParams = {
      data: mockSubclassCreaterParams(),
    }
    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(errors)
  })
})
