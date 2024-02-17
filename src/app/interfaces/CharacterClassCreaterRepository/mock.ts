import { CharacterClassCreaterRepo } from '.'

export const mockCharacterClassCreaterRepo =
  (): jest.Mocked<CharacterClassCreaterRepo> => ({
    create: jest.fn(),
  })
