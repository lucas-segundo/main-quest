import { faker } from '@faker-js/faker'
import { LogErrorRepository, LogErrorRepositoryParams } from '.'

export const mockLogErrorRepositoryParams = (): LogErrorRepositoryParams => ({
  error: new Error(faker.lorem.sentence()),
})

export const mockLogErrorRepository = (): jest.Mocked<LogErrorRepository> => ({
  log: jest.fn(),
})
