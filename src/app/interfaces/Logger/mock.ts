import { faker } from '@faker-js/faker'
import { Logger, LoggerParams } from '.'

export const mockLoggerParams = (): LoggerParams => ({
  level: 'info',
  message: faker.lorem.sentence(),
})

export const mockLogger = (): jest.Mocked<Logger> => ({
  log: jest.fn(),
})
