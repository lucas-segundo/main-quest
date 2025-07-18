import { makeCreateCharacterService } from 'entities/Character/services/CreateCharacter/factory'
import { CreateCharacterUseCase } from '.'
import { makeFindCharacterService } from 'entities/Character/services/FindCharacter/factory'
import { makeFindClassService } from 'entities/Class/services/FindClass/factory'
import { makeCalculateHPUseCase } from '../CalculateHP/factory'

export const makeCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    makeCreateCharacterService(),
    makeFindCharacterService(),
    makeFindClassService(),
    makeCalculateHPUseCase(),
  )
}
