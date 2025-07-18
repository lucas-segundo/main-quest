import { Dice } from 'domain/entities/Dice'

import * as modifier from 'domain/metrics/getAbilityModifier'
import { calculateHP } from '.'

describe('calculateHP', () => {
  it('should calculate HP correctly for level 1', () => {
    jest.spyOn(modifier, 'getAbilityModifier').mockReturnValue(2)

    const hpForLevelOne = calculateHP({
      constitution: 14,
      level: 1,
      classHitDice: '1d6',
    })

    expect(hpForLevelOne).toBe(8)
  })

  it('should calculate HP correctly for levels greater than 1', () => {
    jest.spyOn(modifier, 'getAbilityModifier').mockReturnValue(2)
    jest.spyOn(Dice, 'rollAll').mockReturnValue(4)

    const hpForLevelTwo = calculateHP({
      constitution: 14,
      level: 2,
      classHitDice: '1d6',
    })

    expect(hpForLevelTwo).toBe(6)
  })
})
