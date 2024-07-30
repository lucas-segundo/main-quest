import { ClassesFinderController, ClassesFinderControllerParams } from '.'
import { mockClass } from 'domain/entities/Class/mock'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
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

    const classFilter = mockClassesFinderParams()
    const params: ClassesFinderControllerParams = {
      filter: {
        class: classFilter,
      },
    }

    await sut.handle(params)

    expect(classFinder.find).toHaveBeenCalledWith(classFilter)
  })

  it('should return 200 and the classes', async () => {
    const { sut, findClassSpy } = makeSUT()

    const foundClass = mockClass()
    findClassSpy.mockResolvedValue([foundClass])

    const params: ClassesFinderControllerParams = {
      filter: {
        class: mockClassesFinderParams(),
      },
    }
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([foundClass])
  })

  it('should return 400 if no class filter is provided', async () => {
    const { sut } = makeSUT()

    const response = (await sut.handle({})) as HTTPErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.errors).toEqual(['Missing class filters from query params'])
  })
})
