import { Dice } from 'entities/Dice'
import { CalculateHPUseCase } from '.'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'

const makeMocks = () => {
  const getAbilityModifierUseCase = makeGetAbilityModifierUseCase()
  const sut = new CalculateHPUseCase(getAbilityModifierUseCase)

  return {
    sut,
    getAbilityModifierUseCase,
  }
}

describe('CalculateHPUseCase', () => {
  it('should calculate HP correctly for a single class', () => {
    const { sut, getAbilityModifierUseCase } = makeMocks()

    jest.spyOn(getAbilityModifierUseCase, 'get').mockReturnValue(2)
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
