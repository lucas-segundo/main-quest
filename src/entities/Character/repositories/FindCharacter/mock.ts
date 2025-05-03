import { faker } from '@faker-js/faker'
import { FindCharacterRepository, FindCharacterRepositoryParams } from '.'

export const mockFindCharacterRepositoryParams =
  (): FindCharacterRepositoryParams => ({
    filter: {
      id: {
        equals: faker.string.uuid(),
      },
      name: {
        like: faker.person.firstName(),
      },
    },
  })

export const mockFindCharacterRepository =
  (): jest.Mocked<FindCharacterRepository> => ({
    find: jest.fn(),
  })
