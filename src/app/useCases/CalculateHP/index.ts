import { Dice } from 'domain/entities/Dice'
import { GetAbilityModifierUseCase } from '../GetAbilityModifier'

interface DTO {
  constitution: number
  level: number
  classHitDice: string
}

export class CalculateHPUseCase {
  constructor(
    private readonly getAbilityModifierUseCase: GetAbilityModifierUseCase,
  ) {}

  execute({ constitution, level, classHitDice }: DTO): number {
    const hitPointsForLevelOne = Dice.getMaxValue(classHitDice)
    let totalHitpointsFromDice = hitPointsForLevelOne

    for (let i = 1; i < level; i++) {
      totalHitpointsFromDice += Dice.rollAll(classHitDice)
    }

    return (
      this.getAbilityModifierUseCase.get(constitution) + totalHitpointsFromDice
    )
  }
}
