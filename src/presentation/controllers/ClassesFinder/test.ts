import { ClassesFinderController, ClassesFinderControllerParams } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockClassesFinder,
  mockClassesFinderParams,
} from 'app/useCases/ClassesFinder/mock'

const makeSUT = () => {
  const classFinder = mockClassesFinder()
  const findClassSpy = jest.spyOn(classFinder, 'find')
  const sut = new ClassesFinderController(classFinder)

  return { sut, classFinder, findClassSpy }
}

describe('ClassesFinder', () => {
  it('should call find with right params', async () => {
    const { sut, classFinder } = makeSUT()

    const query = mockClassesFinderParams()
    const params: ClassesFinderControllerParams = {
      query,
    }

    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(query)
  })

  it('should return 200 and the classes', async () => {
    const { sut, findClassSpy } = makeSUT()

    const foundClass = mockClass()
    findClassSpy.mockResolvedValue([foundClass])

    const params: ClassesFinderControllerParams = {
      query: mockClassesFinderParams(),
    }
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([foundClass])
  })
})
