import { faker } from '@faker-js/faker'
import { LoggerRepo, LoggerRepoParams } from '.'

export const mockLoggerRepoParams = (): LoggerRepoParams => ({
  level: 'info',
  message: faker.lorem.sentence(),
  error: new Error(faker.lorem.sentence()),
})

export const mockLoggerRepo = (): jest.Mocked<LoggerRepo> => ({
  log: jest.fn(),
})
