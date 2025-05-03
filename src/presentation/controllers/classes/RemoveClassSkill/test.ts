import { RemoveClassSkillController } from '.'
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
import { mockRemoveClassSkillRepository } from 'entities/Class/repositories/RemoveClassSkill/mock'

const mockData = () => {
  const classID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  return {
    classID,
    skillIDs,
  }
}

const makeSUT = () => {
  const removeClassSkillRepo = mockRemoveClassSkillRepository()
  const removeClassSkillSpy = jest.spyOn(removeClassSkillRepo, 'remove')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  const sut = new RemoveClassSkillController(
    removeClassSkillRepo,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    removeClassSkillRepo,
    removeClassSkillSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('ClassUpdater', () => {
  it('should call repo with right params', async () => {
    const { sut, removeClassSkillRepo } = makeSUT()
    const { classID, skillIDs } = mockData()

    await sut.handle(classID, skillIDs)

    expect(removeClassSkillRepo.remove).toHaveBeenCalledWith(classID, skillIDs)
  })

  it('should right status code and entity', async () => {
    const { sut, removeClassSkillSpy } = makeSUT()
    const { classID, skillIDs } = mockData()

    const classWithSkill = mockClass()
    removeClassSkillSpy.mockResolvedValue(classWithSkill)

    const response = (await sut.handle(classID, skillIDs)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(classWithSkill)
  })

  it('should return 400 with validations errors', async () => {
    const { sut, dataValidation } = makeSUT()
    const { classID, skillIDs } = mockData()

    const errors = [faker.lorem.words(), faker.lorem.words()]
    const validationResult: DataValidatorResult = {
      errors,
    }
    dataValidation.validate.mockResolvedValue(validationResult)

    const response = (await sut.handle(classID, skillIDs)) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(adaptValidationErrors(errors))
  })

  it('should call error handler when error happens', async () => {
    const { sut, removeClassSkillSpy, httpErrorHandlerSpy } = makeSUT()
    const { classID, skillIDs } = mockData()

    const error = new Error('any_error')
    removeClassSkillSpy.mockRejectedValue(error)
    await sut.handle(classID, skillIDs)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
