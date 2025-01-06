import { faker } from '@faker-js/faker'
import { FindSubclass, FindSubclassParams } from '.'

export const mockFindSubclassParams = (): FindSubclassParams => ({
  filter: {
    id: {
      equals: faker.string.uuid(),
    },
  },
})

export const mockFindSubclass = (): jest.Mocked<FindSubclass> => ({
  find: jest.fn(),
})
