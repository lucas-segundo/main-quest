import { Dice } from 'domain/entities/Dice'
import { getAbilityModifier } from 'domain/metrics/getAbilityModifier'

interface DTO {
  constitution: number
  level: number
  classHitDice: string
}

export class CalculateHPUseCase {
  execute({ constitution, level, classHitDice }: DTO): number {
    const hitPointsForLevelOne = Dice.getMaxValue(classHitDice)
    let totalHitpointsFromDice = hitPointsForLevelOne

    for (let i = 1; i < level; i++) {
      totalHitpointsFromDice += Dice.rollAll(classHitDice)
    }

    return getAbilityModifier(constitution) + totalHitpointsFromDice
  }
}
