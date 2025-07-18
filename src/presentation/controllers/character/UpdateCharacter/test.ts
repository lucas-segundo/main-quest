import { UpdateCharacterController, UpdateCharacterControllerParams } from '.'
import { mockCharacter } from 'entities/Character/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import {
  mockUpdateCharacterService,
  mockUpdateCharacterServiceParams,
} from 'entities/Character/services/UpdateCharacter/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'

const mockData = () => {
  const dataToUpdate = mockUpdateCharacterServiceParams()

  const params: UpdateCharacterControllerParams = {
    id: faker.string.uuid(),
    data: dataToUpdate,
  }

  return { dataToUpdate, params }
}

const makeSUT = () => {
  const characterUpdater = mockUpdateCharacterService()
  const updateCharacterSpy = jest.spyOn(characterUpdater, 'update')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  const sut = new UpdateCharacterController(
    characterUpdater,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    characterUpdater,
    updateCharacterSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('CharacterUpdater', () => {
  it('should call updater with right params', async () => {
    const { sut, characterUpdater } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(characterUpdater.update).toHaveBeenCalledWith(params.id, params.data)
  })

  it('should return 201 and the updated character class', async () => {
    const { sut, updateCharacterSpy } = makeSUT()
    const { dataToUpdate, params } = mockData()

    const updatedCharacter = {
      ...mockCharacter(),
      ...dataToUpdate,
    }

    updateCharacterSpy.mockResolvedValue(updatedCharacter)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(HTTPStatusCode.OK)
    expect(response.data).toEqual(updatedCharacter)
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
    const { sut, updateCharacterSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    updateCharacterSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
