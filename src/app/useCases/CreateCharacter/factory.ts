import { makeCreateCharacterService } from 'domain/entities/Character/services/CreateCharacter/factory'
import { CreateCharacterUseCase } from '.'
import { makeFindCharacterService } from 'domain/entities/Character/services/FindCharacter/factory'
import { makeFindClassService } from 'domain/entities/Class/services/FindClass/factory'

export const makeCreateCharacterUserCase = () => {
  return new CreateCharacterUseCase(
    makeCreateCharacterService(),
    makeFindCharacterService(),
    makeFindClassService(),
  )
}
