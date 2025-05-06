import { faker } from '@faker-js/faker'
import { FindSpellRepository, FindSpellRepositoryParams } from '.'

export const mockFindSpellRepositoryParams = (): FindSpellRepositoryParams => ({
  filter: {
    id: {
      equals: faker.string.uuid(),
    },
  },
})

export const mockFindSpellRepository =
  (): jest.Mocked<FindSpellRepository> => ({
    find: jest.fn(),
  })
