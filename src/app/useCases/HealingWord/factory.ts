import { makeFindCharacterService } from 'entities/Character/services/FindCharacter/factory'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'
import { HealingWordUseCase } from '.'

export const makeHealingWordUseCase = () => {
  const findCharacterService = makeFindCharacterService()
  const getAbilityModifierUseCase = makeGetAbilityModifierUseCase()

  return new HealingWordUseCase(findCharacterService, getAbilityModifierUseCase)
}
