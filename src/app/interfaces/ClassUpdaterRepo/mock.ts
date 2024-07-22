import { faker } from '@faker-js/faker'
import { ClassUpdaterRepo, ClassUpdaterRepoParams } from '.'

export const mockClassUpdaterRepoParams = (): ClassUpdaterRepoParams => ({
  name: faker.lorem.word(),
})

export const mockClassUpdaterRepo = (): jest.Mocked<ClassUpdaterRepo> => ({
  update: jest.fn(),
})
