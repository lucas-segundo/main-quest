import { DataValidator } from '.'

export const mockDataValidator = (): jest.Mocked<DataValidator> => ({
  validate: jest.fn(),
})
