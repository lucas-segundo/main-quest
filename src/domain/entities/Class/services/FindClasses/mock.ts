import { faker } from '@faker-js/faker'
import { FindClassesService, FindClassesServiceParams } from '.'

export const mockFindClassesServiceParams = (): FindClassesServiceParams => ({
  filter: {
    name: {
      lk: faker.person.jobTitle(),
    },
  },
  include: {
    subclasses: true,
  },
})

export const mockFindClassesService = (): jest.Mocked<FindClassesService> => ({
  find: jest.fn(),
})
