import { faker } from '@faker-js/faker'
import { FindClassesRepository, FindClassesRepositoryParams } from '.'

export const mockFindClassesRepositoryParams =
  (): FindClassesRepositoryParams => ({
    filter: {
      name: {
        like: faker.person.jobTitle(),
      },
    },
    include: {
      subclasses: true,
    },
  })

export const mockFindClassesRepository =
  (): jest.Mocked<FindClassesRepository> => ({
    find: jest.fn(),
  })
