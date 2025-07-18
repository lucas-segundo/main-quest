import { mockCreateCharacterService } from 'domain/entities/Character/services/CreateCharacter/mock'
import { CreateCharacterUseCase } from '.'
import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { mockFindClassService } from 'domain/entities/Class/services/FindClass/mock'

export const mockCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    mockCreateCharacterService(),
    mockFindCharacterService(),
    mockFindClassService(),
  )
}
