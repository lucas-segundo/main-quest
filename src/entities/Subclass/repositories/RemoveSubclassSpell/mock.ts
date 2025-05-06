import { RemoveSubclassSpellRepository } from '.'

export const mockRemoveSubclassSpellRepository =
  (): jest.Mocked<RemoveSubclassSpellRepository> => ({
    remove: jest.fn(),
  })
