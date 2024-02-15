import { DataValidation } from '.'

export const mockDataValidation = (): jest.Mocked<DataValidation> => ({
  validate: jest.fn(),
})
