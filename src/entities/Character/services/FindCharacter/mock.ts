import { faker } from '@faker-js/faker'
import { FindCharacterService, FindCharacterServiceParams } from '.'

export const mockFindCharacterServiceParams =
  (): FindCharacterServiceParams => ({
    filter: {
      id: {
        equals: faker.string.uuid(),
      },
      name: {
        like: faker.person.firstName(),
      },
    },
  })

export const mockFindCharacterService =
  (): jest.Mocked<FindCharacterService> => ({
    find: jest.fn(),
  })
