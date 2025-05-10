import { CalculateHPUseCase } from '.'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'

export const makeCalculateHPUseCase = () => {
  return new CalculateHPUseCase(makeGetAbilityModifierUseCase())
}
