import { FindSkillsController } from '.'
import { mockSkill } from 'domain/entities/Skill/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { RequiredParamError } from 'domain/errors/RequiredParamError'
import {
  mockFindSkillsRepository,
  mockFindSkillsRepositoryParams,
} from 'domain/entities/Skill/repositories/FindSkills/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockFindSkillsRepositoryParams()
  const foundSkill = mockSkill()

  return { params, foundSkill }
}

const makeSUT = () => {
  const findSkills = mockFindSkillsRepository()
  const findSkillsSpy = jest.spyOn(findSkills, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindSkillsController(findSkills, httpErrorHandler)

  return { sut, findSkills, findSkillsSpy, httpErrorHandlerSpy }
}

describe('SkillsFinder', () => {
  it('should call find with right params', async () => {
    const { sut, findSkills } = makeSUT()

    const params = mockFindSkillsRepositoryParams()
    await sut.handle(params)

    expect(findSkills.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the classes', async () => {
    const { sut, findSkillsSpy } = makeSUT()

    const foundSkill = mockSkill()
    findSkillsSpy.mockResolvedValue([foundSkill])

    const params = mockFindSkillsRepositoryParams()
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([foundSkill])
  })

  it('should return 400 if no class filter is provided', async () => {
    const { sut } = makeSUT()
    const params: any = {}
    const response = (await sut.handle(params)) as HTTPErrorResponse

    const error = new RequiredParamError('filter')
    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual([
      {
        code: error.code,
        message: error.message,
      },
    ])
  })

  it('should call error handler when error happens', async () => {
    const { sut, findSkillsSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findSkillsSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
