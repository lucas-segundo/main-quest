import { faker } from '@faker-js/faker'
import { FindCharacterRepository, FindCharacterRepositoryParams } from '.'

export const mockFindCharacterRepositoryParams =
  (): FindCharacterRepositoryParams => ({
    filter: {
      id: {
        equals: faker.string.uuid(),
      },
    },
  })

export const mockFindCharacterRepository =
  (): jest.Mocked<FindCharacterRepository> => ({
    find: jest.fn(),
  })
