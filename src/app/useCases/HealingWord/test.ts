import { mockCharacter } from 'domain/entities/Character/mock'
import { mockFindCharacterService } from 'domain/entities/Character/services/FindCharacter/mock'
import { Dice } from 'domain/entities/Dice'
import { HealingWordUseCase } from '.'
import * as modifier from 'domain/metrics/getAbilityModifier'

const makeMocks = () => {
  const character = mockCharacter()
  const target = mockCharacter()

  return {
    character,
    target,
  }
}

const makeSUT = () => {
  const findCharacterService = mockFindCharacterService()
  const sut = new HealingWordUseCase(findCharacterService)

  return {
    findCharacterService,
    sut,
  }
}

describe('HealingWordUseCase', () => {
  it('should heal the target when they have less than max hit points', async () => {
    const { sut, findCharacterService } = makeSUT()
    const character = mockCharacter()
    findCharacterService.find.mockResolvedValueOnce(character)

    const target = mockCharacter()
    target.hitPoints = 10
    target.maxHitPoints = 20
    findCharacterService.find.mockResolvedValueOnce(target)

    jest.spyOn(modifier, 'getAbilityModifier').mockReturnValue(2)
    jest.spyOn(Dice, 'rollAll').mockReturnValue(3)

    const result = await sut.execute({
      characterID: 'character1',
      targetID: 'target1',
      spellCastingAbility: 'charisma',
    })

    expect(result).toEqual({ amountHealed: 5 })
  })

  it('should return 0 healing when the target has max hit points', async () => {
    const { character, target } = makeMocks()
    const { sut, findCharacterService } = makeSUT()
    target.hitPoints = target.maxHitPoints

    findCharacterService.find
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
    const { sut, findCharacterService } = makeSUT()
    findCharacterService.find.mockResolvedValueOnce(null) // Character not found

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
    const { sut, findCharacterService } = makeSUT()

    findCharacterService.find
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
