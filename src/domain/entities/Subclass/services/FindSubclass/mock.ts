import { faker } from '@faker-js/faker'
import { FindSubclassService, FindSubclassServiceParams } from '.'

export const mockFindSubclassServiceParams = (): FindSubclassServiceParams => ({
  filter: {
    id: {
      eq: faker.string.uuid(),
    },
  },
})

export const mockFindSubclassService =
  (): jest.Mocked<FindSubclassService> => ({
    find: jest.fn(),
  })
