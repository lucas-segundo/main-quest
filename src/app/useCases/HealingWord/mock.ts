import { mockFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/mock'
import { HealingWordUseCase } from '.'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'

export const mockHealingWordUseCase = () => {
  return new HealingWordUseCase(
    mockFindCharacterRepository(),
    makeGetAbilityModifierUseCase(),
  )
}
