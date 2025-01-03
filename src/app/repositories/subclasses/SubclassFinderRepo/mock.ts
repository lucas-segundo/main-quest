import { faker } from '@faker-js/faker'
import { SubclassFinderRepo, SubclassFinderRepoParams } from '.'

export const mockSubclassFinderRepoParams = (): SubclassFinderRepoParams => ({
  filter: {
    id: {
      equals: faker.string.uuid(),
    },
  },
})

export const mockSubclassFinderRepo = (): jest.Mocked<SubclassFinderRepo> => ({
  find: jest.fn(),
})
