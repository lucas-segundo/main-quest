import { Dice } from 'domain/entities/Dice'
import { CalculateHPUseCase } from '.'

import * as modifier from 'domain/metrics/getAbilityModifier'

const makeMocks = () => {
  const sut = new CalculateHPUseCase()

  return {
    sut,
  }
}

describe('CalculateHPUseCase', () => {
  it('should calculate HP correctly for a single class', () => {
    const { sut } = makeMocks()

    jest.spyOn(modifier, 'getAbilityModifier').mockReturnValue(2)
    jest.spyOn(Dice, 'rollAll').mockReturnValue(2)

    const hp = sut.execute({
      constitution: 14,
      level: 3,
      classHitDice: '1d8',
    })

    expect(hp).toBe(14)

    const hpForLevelOne = sut.execute({
      constitution: 14,
      level: 1,
      classHitDice: '1d8',
    })

    expect(hpForLevelOne).toBe(10)
  })
})
