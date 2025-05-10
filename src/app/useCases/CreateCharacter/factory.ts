import { makeCreateCharacterRepository } from 'entities/Character/repositories/CreateCharacter/factory'
import { CreateCharacterUseCase } from '.'
import { makeFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/factory'
import { makeFindClassRepository } from 'entities/Class/repositories/FindClass/factory'
import { makeCalculateHPUseCase } from '../CalculateHP/factory'

export const makeCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    makeCreateCharacterRepository(),
    makeFindCharacterRepository(),
    makeFindClassRepository(),
    makeCalculateHPUseCase(),
  )
}
