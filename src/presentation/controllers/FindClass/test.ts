import { FindClassController } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockFindClassRepository,
  mockFindClassRepositoryParams,
} from 'app/repositories/classes/FindClass/mock'

const makeSUT = () => {
  const classFinder = mockFindClassRepository()
  const findClassSpy = jest.spyOn(classFinder, 'find')
  const sut = new FindClassController(classFinder)

  return { sut, classFinder, findClassSpy }
}

describe('ClassFinder', () => {
  it('should call find with right params', async () => {
    const { sut, classFinder } = makeSUT()

    const params = mockFindClassRepositoryParams()
    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(params)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findClassSpy } = makeSUT()

    const foundClass = mockClass()
    findClassSpy.mockResolvedValue(foundClass)

    const params = mockFindClassRepositoryParams()
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundClass)
  })
})
