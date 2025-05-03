import { faker } from '@faker-js/faker'
import { CreateCharacterRepository, CreateCharacterRepositoryParams } from '.'

export const mockCreateCharacterRepositoryParams =
  (): CreateCharacterRepositoryParams => ({
    name: faker.commerce.productName(),
    classID: faker.string.uuid(),
    level: faker.number.int({ min: 1, max: 100 }),
  })

export const mockCreateCharacterRepository =
  (): jest.Mocked<CreateCharacterRepository> => ({
    create: jest.fn(),
  })
