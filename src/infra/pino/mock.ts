import { Logger } from 'pino'

export const mockPinoLogger = (): jest.Mocked<Partial<Logger>> => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn(),
})
