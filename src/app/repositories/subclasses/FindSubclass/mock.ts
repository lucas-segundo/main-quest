import { faker } from '@faker-js/faker'
import { FindSubclassRepository, FindSubclassRepositoryParams } from '.'

export const mockFindSubclassRepositoryParams =
  (): FindSubclassRepositoryParams => ({
    filter: {
      id: {
        equals: faker.string.uuid(),
      },
    },
  })

export const mockFindSubclassRepository =
  (): jest.Mocked<FindSubclassRepository> => ({
    find: jest.fn(),
  })
