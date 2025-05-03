import { FindSkillController } from '.'
import { mockSkill } from 'entities/Skill/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockFindSkillRepository,
  mockFindSkillRepositoryParams,
} from 'entities/Skill/repositories/FindSkill/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockFindSkillRepositoryParams()
  const foundSkill = mockSkill()

  return { params, foundSkill }
}

const makeSUT = () => {
  const classFinder = mockFindSkillRepository()
  const findSkillSpy = jest.spyOn(classFinder, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindSkillController(classFinder, httpErrorHandler)

  return { sut, classFinder, findSkillSpy, httpErrorHandlerSpy }
}

describe('SkillFinder', () => {
  it('should call find with right params', async () => {
    const { sut, classFinder } = makeSUT()

    const params = mockFindSkillRepositoryParams()
    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findSkillSpy } = makeSUT()
    const { params, foundSkill } = mockData()

    findSkillSpy.mockResolvedValue(foundSkill)
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundSkill)
  })

  it('should call error handler when error happens', async () => {
    const { sut, findSkillSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findSkillSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
