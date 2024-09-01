import { faker } from '@faker-js/faker'
import { ClassFinderRepo, ClassFinderRepoParams } from '.'

export const mockClassFinderRepoParams = (): ClassFinderRepoParams => ({
  filter: {
    id: {
      equals: faker.string.uuid(),
    },
  },
  include: {
    subclasses: true,
  },
})

export const mockClassFinderRepo = (): jest.Mocked<ClassFinderRepo> => ({
  find: jest.fn(),
})
