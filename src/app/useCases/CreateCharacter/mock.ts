import { mockCreateCharacterRepository } from 'entities/Character/repositories/CreateCharacter/mock'
import { CreateCharacterUseCase } from '.'
import { mockFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/mock'
import { mockFindClassRepository } from 'entities/Class/repositories/FindClass/mock'
import { makeCalculateHPUseCase } from '../CalculateHP/factory'

export const mockCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    mockCreateCharacterRepository(),
    mockFindCharacterRepository(),
    mockFindClassRepository(),
    makeCalculateHPUseCase(),
  )
}
