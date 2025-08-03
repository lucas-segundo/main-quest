import { faker } from '@faker-js/faker'
import { FindCharacterService, FindCharacterServiceParams } from '.'

export const mockFindCharacterServiceParams =
  (): FindCharacterServiceParams => ({
    filter: {
      id: {
        eq: faker.string.uuid(),
      },
      name: {
        lk: faker.person.firstName(),
      },
    },
  })

export const mockFindCharacterService =
  (): jest.Mocked<FindCharacterService> => ({
    find: jest.fn(),
  })
