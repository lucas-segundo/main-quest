import { AddSubclassSpellService } from '.'

export const mockAddSubclassSpellService =
  (): jest.Mocked<AddSubclassSpellService> => ({
    add: jest.fn(),
  })
