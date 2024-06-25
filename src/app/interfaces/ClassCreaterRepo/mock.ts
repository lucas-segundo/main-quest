import { ClassCreaterRepo } from '.'

export const mockClassCreaterRepo = (): jest.Mocked<ClassCreaterRepo> => ({
  create: jest.fn(),
})
