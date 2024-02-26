import { faker } from '@faker-js/faker'
import { SubclassCreater, SubclassCreaterParams } from '.'

export const mockSubclassCreaterParams = (): SubclassCreaterParams => ({
  name: faker.lorem.word(),
})

export const mockSubclassCreater = (): jest.Mocked<SubclassCreater> => ({
  create: jest.fn(),
})
