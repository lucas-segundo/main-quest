import { AddSubclassSpellRepository } from '.'

export const mockAddSubclassSpellRepository =
  (): jest.Mocked<AddSubclassSpellRepository> => ({
    add: jest.fn(),
  })
