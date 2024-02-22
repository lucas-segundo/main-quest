import { faker } from '@faker-js/faker'
import { ErrorLoggerRepo, ErrorLoggerRepoParams } from '.'

export const mockErrorLoggerRepoParams = (): ErrorLoggerRepoParams => ({
  error: new Error(faker.lorem.sentence()),
})

export const mockErrorLoggerRepo = (): jest.Mocked<ErrorLoggerRepo> => ({
  log: jest.fn(),
})
