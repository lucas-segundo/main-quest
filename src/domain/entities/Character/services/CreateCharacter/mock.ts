import { faker } from '@faker-js/faker'
import { CreateCharacterService, CreateCharacterServiceParams } from '.'

export const mockCreateCharacterServiceParams =
  (): CreateCharacterServiceParams => ({
    name: faker.commerce.productName(),
    hitPoints: faker.number.int({ min: 1, max: 100 }),
    maxHitPoints: faker.number.int({ min: 1, max: 100 }),
    classID: faker.string.uuid(),
    level: faker.number.int({ min: 1, max: 20 }),
    strength: faker.number.int({ min: 1, max: 20 }),
    dexterity: faker.number.int({ min: 1, max: 20 }),
    constitution: faker.number.int({ min: 1, max: 20 }),
    intelligence: faker.number.int({ min: 1, max: 20 }),
    wisdom: faker.number.int({ min: 1, max: 20 }),
    charisma: faker.number.int({ min: 1, max: 20 }),
  })

export const mockCreateCharacterService =
  (): jest.Mocked<CreateCharacterService> => ({
    create: jest.fn(),
  })
