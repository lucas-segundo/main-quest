import { mockCreateCharacterService } from 'entities/Character/services/CreateCharacter/mock'
import { CreateCharacterUseCase } from '.'
import { mockFindCharacterService } from 'entities/Character/services/FindCharacter/mock'
import { mockFindClassService } from 'entities/Class/services/FindClass/mock'
import { makeCalculateHPUseCase } from '../CalculateHP/factory'

export const mockCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    mockCreateCharacterService(),
    mockFindCharacterService(),
    mockFindClassService(),
    makeCalculateHPUseCase(),
  )
}
