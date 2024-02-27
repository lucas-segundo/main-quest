import { ClassCreaterImpl } from 'app/useCases/ClassCreater'
import { pinoLogger } from 'infra/pino'
import { PinoErrorLoggerRepo } from 'infra/pino/repositories/ErrorLoggerRepository'
import { PrismaClassCreaterRepo } from 'infra/prisma/repositories/ClassCreaterRepository'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { z } from 'zod'

export const makeClassCreaterController = (): ClassCreaterController => {
  const chracterClassCreaterRepo = new PrismaClassCreaterRepo()
  const errorLoggerRepo = new PinoErrorLoggerRepo(pinoLogger)
  const useCase = new ClassCreaterImpl(
    chracterClassCreaterRepo,
    errorLoggerRepo,
  )

  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassCreaterController(useCase, dataValidator)
}
