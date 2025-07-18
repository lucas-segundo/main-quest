import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { HealingWordDTO, HealingWordUseCase } from '.'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'
import { faker } from '@faker-js/faker'

export const mockHealingWordUseCase = () => {
  return new HealingWordUseCase(
    mockFindCharacterService(),
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
