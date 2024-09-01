import { faker } from '@faker-js/faker'
import { SubclassUpdaterRepo, SubclassUpdaterRepoParams } from '.'

export const mockSubclassUpdaterRepoParams = (): SubclassUpdaterRepoParams => ({
  data: {
    name: faker.person.jobTitle(),
  },
})

export const mockSubclassUpdaterRepo =
  (): jest.Mocked<SubclassUpdaterRepo> => ({
    update: jest.fn(),
  })
