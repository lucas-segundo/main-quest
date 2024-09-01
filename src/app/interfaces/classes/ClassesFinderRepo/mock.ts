import { faker } from '@faker-js/faker'
import { ClassesFinderRepo, ClassesFinderRepoParams } from '.'

export const mockClassesFinderRepoParams = (): ClassesFinderRepoParams => ({
  filter: {
    name: {
      like: faker.person.jobTitle(),
    },
  },
  include: {
    subclasses: true,
  },
})

export const mockClassesFinderRepo = (): jest.Mocked<ClassesFinderRepo> => ({
  find: jest.fn(),
})
