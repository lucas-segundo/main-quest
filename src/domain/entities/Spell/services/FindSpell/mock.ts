import { faker } from '@faker-js/faker'
import { FindSpellService, FindSpellServiceParams } from '.'

export const mockFindSpellServiceParams = (): FindSpellServiceParams => ({
  filter: {
    id: {
      eq: faker.string.uuid(),
    },
  },
})

export const mockFindSpellService = (): jest.Mocked<FindSpellService> => ({
  find: jest.fn(),
})
