import { mockCreateCharacterRepository } from 'entities/Character/repositories/CreateCharacter/mock'
import { CreateCharacterUseCase } from '.'
import { mockFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/mock'

export const mockCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    mockCreateCharacterRepository(),
    mockFindCharacterRepository(),
  )
}
