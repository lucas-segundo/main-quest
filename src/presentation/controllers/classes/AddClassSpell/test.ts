import { AddClassSpellController } from '.'
import { mockClass } from 'entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'
import { mockAddClassSpellService } from 'entities/Class/services/AddClassSpell/mock'

const mockData = () => {
  const classID = faker.string.uuid()
  const spellIDs = [faker.string.uuid(), faker.string.uuid()]

  return {
    classID,
    spellIDs,
  }
}

const makeSUT = () => {
  const addClassSpellRepo = mockAddClassSpellService()
  const addClassSpellSpy = jest.spyOn(addClassSpellRepo, 'add')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  const sut = new AddClassSpellController(
    addClassSpellRepo,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    addClassSpellRepo,
    addClassSpellSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('AddClassSpell', () => {
  it('should call repo with right params', async () => {
    const { sut, addClassSpellRepo } = makeSUT()
    const { classID, spellIDs } = mockData()

    await sut.handle(classID, spellIDs)

    expect(addClassSpellRepo.add).toHaveBeenCalledWith(classID, spellIDs)
  })

  it('should return 200 and the entity', async () => {
    const { sut, addClassSpellSpy } = makeSUT()
    const { classID, spellIDs } = mockData()

    const classWithSpell = mockClass()
    addClassSpellSpy.mockResolvedValue(classWithSpell)

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
    const { sut, addClassSpellSpy, httpErrorHandlerSpy } = makeSUT()
    const { classID, spellIDs } = mockData()

    const error = new Error('any_error')
    addClassSpellSpy.mockRejectedValue(error)
    await sut.handle(classID, spellIDs)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
