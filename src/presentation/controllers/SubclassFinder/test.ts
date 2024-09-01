import { SubclassFinderController, SubclassFinderControllerParams } from '.'
import { mockSubclass } from 'domain/entities/Subclass/mock'
import { HTTPResponse } from 'presentation/interfaces/Controller'
import {
  mockSubclassFinder,
  mockSubclassFinderParams,
} from 'app/useCases/SubclassFinder/mock'

const makeSUT = () => {
  const subclassFinder = mockSubclassFinder()
  const findSubclassSpy = jest.spyOn(subclassFinder, 'find')
  const sut = new SubclassFinderController(subclassFinder)

  return { sut, subclassFinder, findSubclassSpy }
}

describe('SubclassFinder', () => {
  it('should call find with right params', async () => {
    const { sut, subclassFinder } = makeSUT()

    const query = mockSubclassFinderParams()
    const params: SubclassFinderControllerParams = {
      query,
    }

    await sut.handle(params)

    expect(subclassFinder.find).toHaveBeenCalledWith(query)
  })

  it('should return 200 and the find character class', async () => {
    const { sut, findSubclassSpy } = makeSUT()

    const foundSubclass = mockSubclass()
    findSubclassSpy.mockResolvedValue(foundSubclass)

    const params: SubclassFinderControllerParams = {
      query: mockSubclassFinderParams(),
    }
    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(foundSubclass)
  })
})
