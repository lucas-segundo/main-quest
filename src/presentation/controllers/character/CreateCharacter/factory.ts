import { z } from 'zod'
import { CreateCharacterController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeCreateCharacterUserCase } from 'app/useCases/CreateCharacter/factory'

export const makeCreateCharacterController = (): CreateCharacterController => {
  const zodSchema = z.object({
    name: z.string(),
    level: z.number().int().min(1).max(20),
    classID: z.string().uuid(),
    strength: z.number().int().min(1).max(20),
    dexterity: z.number().int().min(1).max(20),
    constitution: z.number().int().min(1).max(20),
    intelligence: z.number().int().min(1).max(20),
    wisdom: z.number().int().min(1).max(20),
    charisma: z.number().int().min(1).max(20),
    spells: z
      .array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
        }),
      )
      .optional(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateCharacterController(
    makeCreateCharacterUserCase(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
