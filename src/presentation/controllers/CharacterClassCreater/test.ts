import { mockCharacterClassCreater } from 'domain/useCases/CharacterClassCreater/mock'
import {
  CharacterClassCreaterController,
  CharacterClassCreaterControllerParams,
} from '.'
import { mockCharacterClass } from 'domain/entities/CharacterClass/mock'

const makeSUT = () => {
  const characterClassCreater = mockCharacterClassCreater()
  const sut = new CharacterClassCreaterController(characterClassCreater)

  return { sut, characterClassCreater }
}

describe('CharacterClassCreater', () => {
  it('should call creater with right params', async () => {
    const { sut, characterClassCreater } = makeSUT()
    const characterClassToCreate = mockCharacterClass()

    const params: CharacterClassCreaterControllerParams = {
      data: characterClassToCreate,
    }

    await sut.handle(params)

    expect(characterClassCreater.create).toHaveBeenCalledWith(
      characterClassToCreate,
    )
  })
})
