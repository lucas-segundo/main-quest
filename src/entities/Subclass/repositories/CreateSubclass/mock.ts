import { faker } from '@faker-js/faker'
import { CreateSubclassRepository, CreateSubclassRepositoryParams } from '.'

export const mockCreateSubclassRepositoryParams =
  (): CreateSubclassRepositoryParams => ({
    name: faker.commerce.productName(),
    classID: faker.string.uuid(),
  })

export const mockCreateSubclassRepository =
  (): jest.Mocked<CreateSubclassRepository> => ({
    create: jest.fn(),
  })
