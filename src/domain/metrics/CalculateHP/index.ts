import { Dice } from 'domain/entities/Dice'
import { getAbilityModifier } from 'domain/metrics/getAbilityModifier'

interface DTO {
  constitution: number
  level: number
  classHitDice: string
}

export const calculateHP = ({ constitution, level, classHitDice }: DTO) => {
  if (level == 1) {
    return getAbilityModifier(constitution) + Dice.getMaxValue(classHitDice)
  }

  return getAbilityModifier(constitution) + Dice.rollAll(classHitDice)
}
