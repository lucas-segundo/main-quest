import { makeFindCharacterService } from 'domain/entities/Character/services/FindCharacter/factory'
import { HealingWordUseCase } from '.'

export const makeHealingWordUseCase = () => {
  const findCharacterService = makeFindCharacterService()

  return new HealingWordUseCase(findCharacterService)
}
