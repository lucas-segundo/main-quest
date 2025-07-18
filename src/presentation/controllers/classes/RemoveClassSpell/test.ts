import { RemoveClassSpellController } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { mockRemoveClassSpellService } from 'domain/entities/Class/services/RemoveClassSpell/mock'

const mockData = () => {
  const classID = faker.string.uuid()
  const spellIDs = [faker.string.uuid(), faker.string.uuid()]

  return {
    classID,
    spellIDs,
  }
}

const makeSUT = () => {
  const removeClassSpellRepo = mockRemoveClassSpellService()
  const removeClassSpellSpy = jest.spyOn(removeClassSpellRepo, 'remove')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  const sut = new RemoveClassSpellController(
    removeClassSpellRepo,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    removeClassSpellRepo,
    removeClassSpellSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('ClassUpdater', () => {
  it('should call repo with right params', async () => {
    const { sut, removeClassSpellRepo } = makeSUT()
    const { classID, spellIDs } = mockData()

    await sut.handle(classID, spellIDs)

    expect(removeClassSpellRepo.remove).toHaveBeenCalledWith(classID, spellIDs)
  })

  it('should right status code and entity', async () => {
    const { sut, removeClassSpellSpy } = makeSUT()
    const { classID, spellIDs } = mockData()

    const classWithSpell = mockClass()
    removeClassSpellSpy.mockResolvedValue(classWithSpell)

    const response = (await sut.handle(classID, spellIDs)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(classWithSpell)
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()
    const { classID, spellIDs } = mockData()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const response = (await sut.handle(classID, spellIDs)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(adaptValidationErrors(errors))
  })

  it('should call error handler when error happens', async () => {
    const { sut, removeClassSpellSpy, httpErrorHandlerSpy } = makeSUT()
    const { classID, spellIDs } = mockData()

    const error = new Error('any_error')
    removeClassSpellSpy.mockRejectedValue(error)
    await sut.handle(classID, spellIDs)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
