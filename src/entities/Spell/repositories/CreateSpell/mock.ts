import { faker } from '@faker-js/faker'
import { CreateSpellRepository, CreateSpellRepositoryParams } from '.'

export const mockCreateSpellRepositoryParams =
  (): CreateSpellRepositoryParams => ({
    name: faker.commerce.productName(),
  })

export const mockCreateSpellRepository =
  (): jest.Mocked<CreateSpellRepository> => ({
    create: jest.fn(),
  })
