import { faker } from '@faker-js/faker'
import { FindClassRepository, FindClassRepositoryParams } from '.'

export const mockFindClassRepositoryParams = (): FindClassRepositoryParams => ({
  filter: {
    id: {
      equals: faker.string.uuid(),
    },
  },
  include: {
    subclasses: true,
  },
})

export const mockFindClassRepository =
  (): jest.Mocked<FindClassRepository> => ({
    find: jest.fn(),
  })
