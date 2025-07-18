import { faker } from '@faker-js/faker'
import { LogErrorService, LogErrorServiceParams } from '.'

export const mockLogErrorServiceParams = (): LogErrorServiceParams => ({
  error: new Error(faker.lorem.sentence()),
})

export const mockLogErrorService = (): jest.Mocked<LogErrorService> => ({
  log: jest.fn(),
})
