import { faker } from '@faker-js/faker'
import { UpdateCharacterService, UpdateCharacterServiceParams } from '.'

export const mockUpdateCharacterServiceParams =
  (): UpdateCharacterServiceParams => ({
    data: {
      name: faker.person.jobTitle(),
      level: faker.number.int({ min: 1, max: 20 }),
      hitPoints: faker.number.int({ min: 1, max: 100 }),
      maxHitPoints: faker.number.int({ min: 1, max: 100 }),
      strength: faker.number.int({ min: 1, max: 20 }),
      dexterity: faker.number.int({ min: 1, max: 20 }),
      constitution: faker.number.int({ min: 1, max: 20 }),
      intelligence: faker.number.int({ min: 1, max: 20 }),
      wisdom: faker.number.int({ min: 1, max: 20 }),
      charisma: faker.number.int({ min: 1, max: 20 }),
    },
  })

export const mockUpdateCharacterService =
  (): jest.Mocked<UpdateCharacterService> => ({
    update: jest.fn(),
  })
