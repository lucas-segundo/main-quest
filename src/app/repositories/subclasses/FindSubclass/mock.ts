import { faker } from '@faker-js/faker'
import { FindSubclasses, FindSubclassesParams } from '.'

export const mockFindSubclassesParams = (): FindSubclassesParams => ({
  filter: {
    id: {
      equals: faker.string.uuid(),
    },
  },
})

export const mockFindSubclasses = (): jest.Mocked<FindSubclasses> => ({
  find: jest.fn(),
})
