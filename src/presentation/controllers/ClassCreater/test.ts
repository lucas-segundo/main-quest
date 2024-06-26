import { ClassCreaterController, ClassCreaterControllerParams } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import {
  mockClassCreater,
  mockClassCreaterParams,
} from 'app/useCases/ClassCreater/mock'

const makeSUT = () => {
  const classCreater = mockClassCreater()
  const createClassSpy = jest.spyOn(classCreater, 'create')
  const dataValidation = mockDataValidator()
  const sut = new ClassCreaterController(classCreater, dataValidation)

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return { sut, classCreater, createClassSpy, dataValidation }
}

describe('ClassCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, classCreater } = makeSUT()
    const classToCreate = mockClassCreaterParams()

    const params: ClassCreaterControllerParams = {
      data: classToCreate,
    }

    await sut.handle(params)

    expect(classCreater.create).toHaveBeenCalledWith(classToCreate)
  })

  it('should return 201 and the created character class', async () => {
    const { sut, createClassSpy } = makeSUT()

    const classToCreate = mockClassCreaterParams()
    const createdClass = {
      ...mockClass(),
      ...classToCreate,
    }

    createClassSpy.mockResolvedValue(createdClass)

    const params: ClassCreaterControllerParams = {
      data: classToCreate,
    }

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(createdClass)
  })

  it('should return 500 if creater throws error', async () => {
    const { sut, createClassSpy } = makeSUT()

    const error = new Error()
    createClassSpy.mockRejectedValue(error)

    const params: ClassCreaterControllerParams = {
      data: mockClassCreaterParams(),
    }

    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(500)
    expect(response.errors).toEqual([new UnexpectedError().message])
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const params: ClassCreaterControllerParams = {
      data: mockClassCreaterParams(),
    }
    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(errors)
  })
})
