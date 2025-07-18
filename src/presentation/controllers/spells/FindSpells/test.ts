import { FindSpellsController } from '.'
import { mockSpell } from 'domain/entities/Spell/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { RequiredParamError } from 'app/errors/RequiredParamError'
import {
  mockFindSpellsService,
  mockFindSpellsServiceParams,
} from 'domain/entities/Spell/services/FindSpells/mock'
import { mockHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/mock'

const mockData = () => {
  const params = mockFindSpellsServiceParams()
  const foundSpell = mockSpell()

  return { params, foundSpell }
}

const makeSUT = () => {
  const findSpells = mockFindSpellsService()
  const findSpellsSpy = jest.spyOn(findSpells, 'find')

  const httpErrorHandler = mockHTTPErrorHandler()
  const httpErrorHandlerSpy = jest.spyOn(httpErrorHandler, 'handle')

  const sut = new FindSpellsController(findSpells, httpErrorHandler)

  return { sut, findSpells, findSpellsSpy, httpErrorHandlerSpy }
}

describe('SpellsFinder', () => {
  it('should call find with right params', async () => {
    const { sut, findSpells } = makeSUT()

    const params = mockFindSpellsServiceParams()
    await sut.handle(params)

    expect(findSpells.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the classes', async () => {
    const { sut, findSpellsSpy } = makeSUT()

    const foundSpell = mockSpell()
    findSpellsSpy.mockResolvedValue([foundSpell])

    const params = mockFindSpellsServiceParams()
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([foundSpell])
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
    const { sut, findSpellsSpy, httpErrorHandlerSpy } = makeSUT()
    const { params } = mockData()

    const error = new Error('any_error')
    findSpellsSpy.mockRejectedValue(error)
    await sut.handle(params)

    expect(httpErrorHandlerSpy).toHaveBeenCalledWith(error)
  })
})
