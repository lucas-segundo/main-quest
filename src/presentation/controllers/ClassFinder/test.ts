import { ClassFinderController, ClassFinderControllerParams } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockClassFinder,
  mockClassFinderParams,
} from 'app/useCases/ClassFinder/mock'

const makeSUT = () => {
  const classFinder = mockClassFinder()
  const findClassSpy = jest.spyOn(classFinder, 'find')
  const sut = new ClassFinderController(classFinder)

  return { sut, classFinder, findClassSpy }
}

describe('ClassFinder', () => {
  it('should call find with right params', async () => {
    const { sut, classFinder } = makeSUT()

    const query = mockClassFinderParams()
    const params: ClassFinderControllerParams = {
      query,
    }

    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(query)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findClassSpy } = makeSUT()

    const foundClass = mockClass()
    findClassSpy.mockResolvedValue(foundClass)

    const params: ClassFinderControllerParams = {
      query: mockClassFinderParams(),
    }
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundClass)
  })
})
