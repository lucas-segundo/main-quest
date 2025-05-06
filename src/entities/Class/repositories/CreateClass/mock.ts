import { faker } from '@faker-js/faker'
import { CreateClassRepository, CreateClassRepositoryParams } from '.'

export const mockCreateClassRepositoryParams =
  (): CreateClassRepositoryParams => ({
    name: faker.lorem.word(),
  })

export const mockCreateClassRepository =
  (): jest.Mocked<CreateClassRepository> => ({
    create: jest.fn(),
  })
