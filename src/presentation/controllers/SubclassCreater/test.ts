import {
  mockSubclassCreater,
  mockSubclassCreaterParams,
} from 'domain/useCases/SubclassCreater/mock'
import { SubclassCreaterController, SubclassCreaterControllerParams } from '.'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const subclassCreater = mockSubclassCreater()
  const dataValidation = mockDataValidator()
  const sut = new SubclassCreaterController(subclassCreater, dataValidation)

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return { sut, subclassCreater, dataValidation }
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
    const { sut, subclassCreater } = makeSUT()

    const subclassToCreate = mockSubclassCreaterParams()
    const createdSubclass = {
      ...mockSubclass(),
      ...subclassToCreate,
    }

    subclassCreater.create.mockResolvedValue(createdSubclass)

    const params: SubclassCreaterControllerParams = {
      data: subclassToCreate,
    }

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(createdSubclass)
  })

  it('should return 500 if creater throws unexpected error', async () => {
    const { sut, subclassCreater } = makeSUT()

    const error = new UnexpectedError()
    subclassCreater.create.mockRejectedValue(new UnexpectedError())

    const params: SubclassCreaterControllerParams = {
      data: mockSubclassCreaterParams(),
    }

    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(500)
    expect(response.errors).toEqual([error.message])
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
