import { RemoveClassSpellRepository } from '.'

export const mockRemoveClassSpellRepository =
  (): jest.Mocked<RemoveClassSpellRepository> => ({
    remove: jest.fn(),
  })
