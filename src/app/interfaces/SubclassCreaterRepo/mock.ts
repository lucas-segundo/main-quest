import { faker } from '@faker-js/faker'
import { SubclassCreaterRepo, SubclassCreaterRepoParams } from '.'

export const mockSubclassCreaterRepoParams = (): SubclassCreaterRepoParams => ({
  name: faker.commerce.productName(),
  classID: faker.string.uuid(),
})

export const mockSubclassCreaterRepo =
  (): jest.Mocked<SubclassCreaterRepo> => ({
    create: jest.fn(),
  })
