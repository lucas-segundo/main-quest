import { faker } from '@faker-js/faker'
import { FindSpellsService, FindSpellsServiceParams } from '.'

export const mockFindSpellsServiceParams = (): FindSpellsServiceParams => ({
  filter: {
    name: {
      like: faker.lorem.words(3),
    },
    classID: {
      eq: faker.string.uuid(),
    },
    subclassID: {
      eq: faker.string.uuid(),
    },
  },
})

export const mockFindSpellsService = (): jest.Mocked<FindSpellsService> => ({
  find: jest.fn(),
})
