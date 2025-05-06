import { AddClassSpellRepository } from '.'

export const mockAddClassSpellRepository =
  (): jest.Mocked<AddClassSpellRepository> => ({
    add: jest.fn(),
  })
