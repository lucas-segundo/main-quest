import { faker } from '@faker-js/faker'
import { ClassFinderRepo, ClassFinderRepoParams } from '.'

export const mockClassFinderRepoParams = (): ClassFinderRepoParams => ({
  id: {
    equals: faker.string.uuid(),
  },
})

export const mockClassFinderRepo = (): jest.Mocked<ClassFinderRepo> => ({
  find: jest.fn(),
})
