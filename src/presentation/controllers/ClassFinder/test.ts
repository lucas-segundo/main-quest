import { ClassFinderController, ClassFinderControllerParams } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import {
  mockClassFinder,
  mockClassFinderParams,
} from 'app/useCases/ClassFinder/mock'

const makeSUT = () => {
  const classFinder = mockClassFinder()
  const findClassSpy = jest.spyOn(classFinder, 'find')
  const dataValidation = mockDataValidator()
  const sut = new ClassFinderController(classFinder, dataValidation)

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return { sut, classFinder, findClassSpy, dataValidation }
}

describe('ClassFinder', () => {
  it('should call find with right params', async () => {
    const { sut, classFinder } = makeSUT()

    const query = mockClassFinderParams()
    const params: ClassFinderControllerParams = {
      query,
    }

    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(query)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findClassSpy } = makeSUT()

    const foundClass = mockClass()
    findClassSpy.mockResolvedValue(foundClass)

    const params: ClassFinderControllerParams = {
      query: mockClassFinderParams(),
    }
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundClass)
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const params: ClassFinderControllerParams = {
      query: mockClassFinderParams(),
    }
    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(errors)
  })
})
