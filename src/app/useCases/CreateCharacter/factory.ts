import { makeCreateCharacterRepository } from 'entities/Character/repositories/CreateCharacter/factory'
import { CreateCharacterUseCase } from '.'
import { makeFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/factory'

export const makeCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    makeCreateCharacterRepository(),
    makeFindCharacterRepository(),
  )
}
