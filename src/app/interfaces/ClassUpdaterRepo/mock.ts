import { faker } from '@faker-js/faker'
import { ClassUpdaterRepo, ClassUpdaterRepoParams } from '.'

export const mockClassUpdaterRepoParams = (): ClassUpdaterRepoParams => ({
  data: {
    name: faker.person.jobTitle(),
  },
  include: {
    subclasses: faker.datatype.boolean(),
  },
})

export const mockClassUpdaterRepo = (): jest.Mocked<ClassUpdaterRepo> => ({
  update: jest.fn(),
})
