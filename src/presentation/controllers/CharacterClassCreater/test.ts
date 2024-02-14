import { mockCharacterClassCreater } from 'domain/useCases/CharacterClassCreater/mock'
import {
  CharacterClassCreaterController,
  CharacterClassCreaterControllerParams,
} from '.'
import { mockCharacterClass } from 'domain/entities/CharacterClass/mock'

describe('CharacterClassCreater', () => {
  it('should call creater with right params', async () => {
    const characterClassToCreate = mockCharacterClass()
    const characterClassCreater = mockCharacterClassCreater()
    const sut = new CharacterClassCreaterController(characterClassCreater)

    const params: CharacterClassCreaterControllerParams = {
      data: characterClassToCreate,
    }

    await sut.handle(params)

    expect(characterClassCreater.create).toHaveBeenCalledWith(
      characterClassToCreate,
    )
  })
})
