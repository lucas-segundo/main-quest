import { z } from 'zod'
import { HealingWordController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { makeHealingWordUseCase } from 'app/useCases/HealingWord/factory'

export const makeHealingWordController = (): HealingWordController => {
  const zodSchema = z.object({
    characterID: z.string(),
    targetID: z.string(),
    spellCastingAbility: z.enum([
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma',
    ]),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new HealingWordController(
    makeHealingWordUseCase(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
