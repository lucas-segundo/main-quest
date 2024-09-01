import { faker } from '@faker-js/faker'
import { ClassCreaterRepo, ClassCreaterRepoParams } from '.'

export const mockClassCreaterRepoParams = (): ClassCreaterRepoParams => ({
  name: faker.lorem.word(),
})

export const mockClassCreaterRepo = (): jest.Mocked<ClassCreaterRepo> => ({
  create: jest.fn(),
})
