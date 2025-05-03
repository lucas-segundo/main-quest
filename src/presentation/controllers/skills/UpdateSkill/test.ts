import { UpdateSkillController, UpdateSkillControllerParams } from '.'
import { mockSkill } from 'entities/Skill/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockDataValidator } from 'presentation/interfaces/DataValidator/mock'
import { DataValidatorResult } from 'presentation/interfaces/DataValidator'
import { faker } from '@faker-js/faker'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import {
  mockUpdateSkillRepository,
  mockUpdateSkillRepositoryParams,
} from 'entities/Skill/repositories/UpdateSkill/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const dataToUpdate = mockUpdateSkillRepositoryParams()

  const params: UpdateSkillControllerParams = {
    id: faker.string.uuid(),
    data: dataToUpdate,
  }

  return { dataToUpdate, params }
}

const makeSUT = () => {
  const classUpdater = mockUpdateSkillRepository()
  const updateSkillSpy = jest.spyOn(classUpdater, 'update')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const dataValidation = mockDataValidator()
  const sut = new UpdateSkillController(
    classUpdater,
    dataValidation,
    httpErrorHandler,
  )

  dataValidation.validate.mockResolvedValue({ errors: [] })

  return {
    sut,
    classUpdater,
    updateSkillSpy,
    dataValidation,
    httpErrorHandlerSpy,
  }
}

describe('SkillUpdater', () => {
  it('should call updater with right params', async () => {
    const { sut, classUpdater } = makeSUT()
    const { params } = mockData()

    await sut.handle(params)

    expect(classUpdater.update).toHaveBeenCalledWith(params.id, params.data)
  })

  it('should return 201 and the updated character class', async () => {
    const { sut, updateSkillSpy } = makeSUT()
    const { dataToUpdate, params } = mockData()

    const updatedSkill = {
      ...mockSkill(),
      ...dataToUpdate,
    }

    updateSkillSpy.mockResolvedValue(updatedSkill)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(updatedSkill)
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
    const { sut, updateSkillSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    updateSkillSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
