import { CreateClassController } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import {
  mockCreateClassRepository,
  mockCreateClassRepositoryParams,
} from 'domain/entities/Class/repositories/CreateClass/mock'

const makeSUT = () => {
  const classCreater = mockCreateClassRepository()
  const createClassSpy = jest.spyOn(classCreater, 'create')
  const dataValidation = mockDataValidator()

  const sut = new CreateClassController(classCreater, dataValidation)

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return { sut, classCreater, createClassSpy, dataValidation }
}

describe('ClassCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, classCreater } = makeSUT()
    const params = mockCreateClassRepositoryParams()

    await sut.handle(params)

    expect(classCreater.create).toHaveBeenCalledWith(params)
  })

  it('should return 201 and the created character class', async () => {
    const { sut, createClassSpy } = makeSUT()
    const params = mockCreateClassRepositoryParams()
    const createdClass = {
      ...mockClass(),
      ...params,
    }

    createClassSpy.mockResolvedValue(createdClass)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(createdClass)
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const params = mockCreateClassRepositoryParams()
    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(adaptValidationErrors(errors))
  })
})
