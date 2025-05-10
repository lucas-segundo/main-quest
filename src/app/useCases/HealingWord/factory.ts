import { makeFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/factory'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'
import { HealingWordUseCase } from '.'

export const makeHealingWordUseCase = () => {
  const findCharacterRepository = makeFindCharacterRepository()
  const getAbilityModifierUseCase = makeGetAbilityModifierUseCase()

  return new HealingWordUseCase(
    findCharacterRepository,
    getAbilityModifierUseCase,
  )
}
