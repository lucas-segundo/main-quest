import { RemoveClassSpellService } from '.'

export const mockRemoveClassSpellService =
  (): jest.Mocked<RemoveClassSpellService> => ({
    remove: jest.fn(),
  })
