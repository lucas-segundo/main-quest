import { mockFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/mock'
import { HealingWordDTO, HealingWordUseCase } from '.'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'
import { faker } from '@faker-js/faker'

export const mockHealingWordUseCase = () => {
  return new HealingWordUseCase(
    mockFindCharacterRepository(),
    makeGetAbilityModifierUseCase(),
  )
}

export const mockHealingWordUseCaseDTO = (): HealingWordDTO => {
  return {
    characterID: faker.string.uuid(),
    targetID: faker.string.uuid(),
    spellCastingAbility: 'charisma',
  }
}
