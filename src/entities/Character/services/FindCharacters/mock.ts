import { faker } from '@faker-js/faker'
import { FindCharactersService, FindCharactersServiceParams } from '.'

export const mockFindCharactersServiceParams =
  (): FindCharactersServiceParams => ({
    filter: {
      name: {
        like: faker.lorem.words(3),
      },
      classID: {
        equals: faker.string.uuid(),
      },
    },
  })

export const mockFindCharactersService =
  (): jest.Mocked<FindCharactersService> => ({
    find: jest.fn(),
  })
