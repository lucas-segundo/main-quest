import { faker } from '@faker-js/faker'
import { FindClassService, FindClassServiceParams } from '.'

export const mockFindClassServiceParams = (): FindClassServiceParams => ({
  filter: {
    id: {
      eq: faker.string.uuid(),
    },
  },
  include: {
    subclasses: true,
    spells: true,
  },
})

export const mockFindClassService = (): jest.Mocked<FindClassService> => ({
  find: jest.fn(),
})
