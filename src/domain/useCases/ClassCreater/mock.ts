import { faker } from '@faker-js/faker'
import { ClassCreater, ClassCreaterParams } from '.'

export const mockClassCreaterParams = (): ClassCreaterParams => ({
  name: faker.lorem.word(),
})

export const mockClassCreater = (): jest.Mocked<ClassCreater> => ({
  create: jest.fn(),
})
