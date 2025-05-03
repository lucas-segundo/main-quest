import { faker } from '@faker-js/faker'
import { CreateCharacterRepository, CreateCharacterRepositoryParams } from '.'

export const mockCreateCharacterRepositoryParams =
  (): CreateCharacterRepositoryParams => ({
    name: faker.commerce.productName(),
    classID: faker.string.uuid(),
    level: faker.number.int({ min: 1, max: 100 }),
    strength: faker.number.int({ min: 1, max: 20 }),
    dexterity: faker.number.int({ min: 1, max: 20 }),
    constitution: faker.number.int({ min: 1, max: 20 }),
    intelligence: faker.number.int({ min: 1, max: 20 }),
    wisdom: faker.number.int({ min: 1, max: 20 }),
    charisma: faker.number.int({ min: 1, max: 20 }),
  })

export const mockCreateCharacterRepository =
  (): jest.Mocked<CreateCharacterRepository> => ({
    create: jest.fn(),
  })
