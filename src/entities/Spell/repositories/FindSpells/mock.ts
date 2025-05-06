import { faker } from '@faker-js/faker'
import { FindSpellsRepository, FindSpellsRepositoryParams } from '.'

export const mockFindSpellsRepositoryParams =
  (): FindSpellsRepositoryParams => ({
    filter: {
      name: {
        like: faker.lorem.words(3),
      },
      classID: {
        equals: faker.string.uuid(),
      },
      subclassID: {
        equals: faker.string.uuid(),
      },
    },
  })

export const mockFindSpellsRepository =
  (): jest.Mocked<FindSpellsRepository> => ({
    find: jest.fn(),
  })
