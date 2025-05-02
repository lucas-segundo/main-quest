import { faker } from '@faker-js/faker'
import { FindCharactersRepository, FindCharactersRepositoryParams } from '.'

export const mockFindCharactersRepositoryParams =
  (): FindCharactersRepositoryParams => ({
    filter: {
      name: {
        like: faker.lorem.words(3),
      },
      classID: {
        equals: faker.string.uuid(),
      },
    },
  })

export const mockFindCharactersRepository =
  (): jest.Mocked<FindCharactersRepository> => ({
    find: jest.fn(),
  })
