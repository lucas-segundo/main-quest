import { mockCharacter } from 'entities/Character/mock'
import { mockFindCharacterRepository } from 'entities/Character/repositories/FindCharacter/mock'
import { GetAbilityModifierUseCase } from '../GetAbilityModifier'
import { Dice } from 'entities/Dice'
import { HealingWordUseCase } from '.'
import { makeGetAbilityModifierUseCase } from '../GetAbilityModifier/factory'

const makeMocks = () => {
  const character = mockCharacter()
  const target = mockCharacter()

  return {
    character,
    target,
  }
}

const makeSUT = () => {
  const findCharacterRepository = mockFindCharacterRepository()
  const sut = new HealingWordUseCase(
    findCharacterRepository,
    makeGetAbilityModifierUseCase(),
  )

  return {
    findCharacterRepository,
    sut,
  }
}

describe('HealingWordUseCase', () => {
  it('should heal the target when they have less than max hit points', async () => {
    const { sut, findCharacterRepository } = makeSUT()
    const character = mockCharacter()
    findCharacterRepository.find.mockResolvedValueOnce(character)

    const target = mockCharacter()
    target.hitPoints = 10
    target.maxHitPoints = 20
    findCharacterRepository.find.mockResolvedValueOnce(target)

    jest.spyOn(GetAbilityModifierUseCase.prototype, 'get').mockReturnValue(2) // Modifier
    jest.spyOn(Dice, 'rollAll').mockReturnValue(3) // Dice roll

    const result = await sut.execute({
      characterID: 'character1',
      targetID: 'target1',
      spellCastingAbility: 'charisma',
    })

    expect(result).toEqual({ amountHealed: 5 })
  })

  it('should return 0 healing when the target has max hit points', async () => {
    const { character, target } = makeMocks()
    const { sut, findCharacterRepository } = makeSUT()
    target.hitPoints = target.maxHitPoints

    findCharacterRepository.find
      .mockResolvedValueOnce(character) // Character
      .mockResolvedValueOnce(target) // Target

    const result = await sut.execute({
      characterID: 'character1',
      targetID: 'target1',
      spellCastingAbility: 'charisma',
    })

    expect(result).toEqual({ amountHealed: 0 })
  })

  it('should throw an error if the character is not found', async () => {
    const { sut, findCharacterRepository } = makeSUT()
    findCharacterRepository.find.mockResolvedValueOnce(null) // Character not found

    await expect(
      sut.execute({
        characterID: 'character1',
        targetID: 'target1',
        spellCastingAbility: 'charisma',
      }),
    ).rejects.toThrow('Character not found')
  })

  it('should throw an error if the target is not found', async () => {
    const { character } = makeMocks()
    const { sut, findCharacterRepository } = makeSUT()

    findCharacterRepository.find
      .mockResolvedValueOnce(character) // Character
      .mockResolvedValueOnce(null) // Target not found

    await expect(
      sut.execute({
        characterID: 'character1',
        targetID: 'target1',
        spellCastingAbility: 'charisma',
      }),
    ).rejects.toThrow('Target not found')
  })
})
