import { RemoveSubclassSpellService } from '.'

export const mockRemoveSubclassSpellService =
  (): jest.Mocked<RemoveSubclassSpellService> => ({
    remove: jest.fn(),
  })
