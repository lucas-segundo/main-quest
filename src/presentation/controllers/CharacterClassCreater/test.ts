import {
  mockCharacterClassCreater,
  mockCharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater/mock'
import {
  CharacterClassCreaterController,
  CharacterClassCreaterControllerParams,
} from '.'
import { mockCharacterClass } from 'domain/entities/CharacterClass/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidation } from 'presentation/interfaces/DataValidation/mock'
import { DataValidationResult } from 'presentation/interfaces/DataValidation'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const characterClassCreater = mockCharacterClassCreater()
  const dataValidation = mockDataValidation()
  const sut = new CharacterClassCreaterController(
    characterClassCreater,
    dataValidation,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return { sut, characterClassCreater, dataValidation }
}

describe('CharacterClassCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, characterClassCreater } = makeSUT()
    const characterClassToCreate = mockCharacterClassCreaterParams()

    const params: CharacterClassCreaterControllerParams = {
      data: characterClassToCreate,
    }

    await sut.handle(params)

    expect(characterClassCreater.create).toHaveBeenCalledWith(
      characterClassToCreate,
    )
  })

  it('should return 201 and the created character class', async () => {
    const { sut, characterClassCreater } = makeSUT()

    const characterClassToCreate = mockCharacterClassCreaterParams()
    const createdCharacterClass = {
      ...mockCharacterClass(),
      ...characterClassToCreate,
    }

    characterClassCreater.create.mockResolvedValue(createdCharacterClass)

    const params: CharacterClassCreaterControllerParams = {
      data: characterClassToCreate,
    }

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(createdCharacterClass)
  })

  it('should return 500 if creater throws unexpected error', async () => {
    const { sut, characterClassCreater } = makeSUT()

    const error = new UnexpectedError()
    characterClassCreater.create.mockRejectedValue(new UnexpectedError())

    const params: CharacterClassCreaterControllerParams = {
      data: mockCharacterClassCreaterParams(),
    }

    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(500)
    expect(response.errors).toEqual([error.message])
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidationResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const params: CharacterClassCreaterControllerParams = {
      data: mockCharacterClassCreaterParams(),
    }
    const response = (await sut.handle(params)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(errors)
  })
})
