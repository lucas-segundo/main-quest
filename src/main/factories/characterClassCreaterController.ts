import { CharacterClassCreaterImpl } from 'app/useCases/CharacterClassCreater'
import { pinoLogger } from 'infra/pino'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { PrismaCharacterClassCreaterRepo } from 'infra/prisma/repositories/CharacterClassCreaterRepository'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { CharacterClassCreaterController } from 'presentation/controllers/CharacterClassCreater'
import { z } from 'zod'

export const makeCharacterClassCreaterController =
  (): CharacterClassCreaterController => {
    const chracterClassCreaterRepo = new PrismaCharacterClassCreaterRepo()
    const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
    const useCase = new CharacterClassCreaterImpl(
      chracterClassCreaterRepo,
      errorLoggerRepo,
    )

    const zodSchema = z.object({
      name: z.string(),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new CharacterClassCreaterController(useCase, dataValidator)
  }
