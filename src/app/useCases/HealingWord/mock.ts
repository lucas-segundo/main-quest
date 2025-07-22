import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { HealingWordDTO, HealingWordUseCase } from '.'
import { faker } from '@faker-js/faker'
import { mockUpdateCharacterService } from 'domain/entities/Character/services/UpdateCharacter/mock'

export const mockHealingWordUseCase = () => {
  return new HealingWordUseCase(
    mockFindCharacterService(),
    mockUpdateCharacterService(),
  )
}

export const mockHealingWordUseCaseDTO = (): HealingWordDTO => {
  return {
    characterID: faker.string.uuid(),
    targetID: faker.string.uuid(),
    spellCastingAbility: 'charisma',
  }
}
