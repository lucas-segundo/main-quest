import { faker } from '@faker-js/faker'
import { CharacterClassCreater, CharacterClassCreaterParams } from '.'

export const mockCharacterClassCreaterParams =
  (): CharacterClassCreaterParams => ({
    name: faker.lorem.word(),
  })

export const mockCharacterClassCreater =
  (): jest.Mocked<CharacterClassCreater> => ({
    create: jest.fn(),
  })
