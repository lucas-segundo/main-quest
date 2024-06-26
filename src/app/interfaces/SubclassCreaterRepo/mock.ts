import { faker } from '@faker-js/faker'
import { SubclassCreaterRepo, SubclassCreaterRepoParams } from '.'

export const mockSubclassCreaterRepoParams = (): SubclassCreaterRepoParams => ({
  name: faker.commerce.productName(),
})

export const mockSubclassCreaterRepo =
  (): jest.Mocked<SubclassCreaterRepo> => ({
    create: jest.fn(),
  })
