import { FindClassesController } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { RequiredParamError } from 'domain/errors/RequiredParamError'
import {
  mockFindClassesRepository,
  mockFindClassesRepositoryParams,
} from 'app/repositories/classes/FindClasses/mock'

const makeSUT = () => {
  const findClasses = mockFindClassesRepository()
  const findClassesSpy = jest.spyOn(findClasses, 'find')
  const sut = new FindClassesController(findClasses)

  return { sut, findClasses, findClassesSpy }
}

describe('ClassesFinder', () => {
  it('should call find with right params', async () => {
    const { sut, findClasses } = makeSUT()

    const params = mockFindClassesRepositoryParams()
    await sut.handle(params)

    expect(findClasses.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the classes', async () => {
    const { sut, findClassesSpy } = makeSUT()

    const foundClass = mockClass()
    findClassesSpy.mockResolvedValue([foundClass])

    const params = mockFindClassesRepositoryParams()
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([foundClass])
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
})
