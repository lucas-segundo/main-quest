import { faker } from '@faker-js/faker'
import { CharacterClassCreater, Params } from '.'

export const mockCharacterClassCreaterParams = (): Params => ({
  name: faker.lorem.word(),
})

export const mockCharacterClassCreater =
  (): jest.Mocked<CharacterClassCreater> => ({
    create: jest.fn(),
  })
