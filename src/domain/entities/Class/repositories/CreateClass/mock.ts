import { faker } from '@faker-js/faker'
import { CreateClassRepository, CreateClassRepositoryParams } from '.'

export const mockCreateClassRepositoryParams =
  (): CreateClassRepositoryParams => ({
    name: faker.lorem.word(),
    skillIDs: [
      faker.number.int({ min: 1, max: 100 }),
      faker.number.int({ min: 1, max: 100 }),
    ],
  })

export const mockCreateClassRepository =
  (): jest.Mocked<CreateClassRepository> => ({
    create: jest.fn(),
  })
