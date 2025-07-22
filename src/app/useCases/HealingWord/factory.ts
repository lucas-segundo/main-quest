import { makeFindCharacterService } from 'domain/entities/Character/services/FindCharacter/factory'
import { HealingWordUseCase } from '.'
import { makeUpdateCharacterService } from 'domain/entities/Character/services/UpdateCharacter/factory'

export const makeHealingWordUseCase = () => {
  return new HealingWordUseCase(
    makeFindCharacterService(),
    makeUpdateCharacterService(),
  )
}
