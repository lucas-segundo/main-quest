import { AddClassSpellService } from '.'

export const mockAddClassSpellService =
  (): jest.Mocked<AddClassSpellService> => ({
    add: jest.fn(),
  })
