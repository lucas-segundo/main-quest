import { FindSpellController } from '.'
import { mockSpell } from 'entities/Spell/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockFindSpellService,
  mockFindSpellServiceParams,
} from 'entities/Spell/services/FindSpell/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockFindSpellServiceParams()
  const foundSpell = mockSpell()

  return { params, foundSpell }
}

const makeSUT = () => {
  const classFinder = mockFindSpellService()
  const findSpellSpy = jest.spyOn(classFinder, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindSpellController(classFinder, httpErrorHandler)

  return { sut, classFinder, findSpellSpy, httpErrorHandlerSpy }
}

describe('SpellFinder', () => {
  it('should call find with right params', async () => {
    const { sut, classFinder } = makeSUT()

    const params = mockFindSpellServiceParams()
    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findSpellSpy } = makeSUT()
    const { params, foundSpell } = mockData()

    findSpellSpy.mockResolvedValue(foundSpell)
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundSpell)
  })

  it('should call error handler when error happens', async () => {
    const { sut, findSpellSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findSpellSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
