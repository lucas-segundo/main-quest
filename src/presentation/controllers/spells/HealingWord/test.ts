import { HealingWordController } from '.'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import {
  mockHealingWordUseCase,
  mockHealingWordUseCaseDTO,
} from 'app/useCases/HealingWord/mock'
import { HealingWordUseCaseResult } from 'app/useCases/HealingWord'

const mockData = () => {
  const params = mockHealingWordUseCaseDTO()

  return { params }
}

const makeSUT = () => {
  const healingWordUseCase = mockHealingWordUseCase()

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  const sut = new HealingWordController(
    healingWordUseCase,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    healingWordUseCase,
    httpErrorHandler,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('HealingWordController', () => {
  it('should call use case with right params', async () => {
    const { sut, healingWordUseCase } = makeSUT()
    const { params } = mockData()

    const executeSpy = jest.spyOn(healingWordUseCase, 'execute')
    await sut.handle(params)

    expect(executeSpy).toHaveBeenCalledWith(params)
  })

  it('should return 200', async () => {
    const { sut, healingWordUseCase } = makeSUT()
    const { params } = mockData()

    const result: HealingWordUseCaseResult = {
      amountHealed: 5,
    }
    jest.spyOn(healingWordUseCase, 'execute').mockResolvedValue(result)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(result)
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
})
