import { faker } from '@faker-js/faker'
import { CreateClassService, CreateClassServiceParams } from '.'

export const mockCreateClassServiceParams = (): CreateClassServiceParams => ({
  name: faker.lorem.word(),
  hitDice: faker.helpers.arrayElement(['1d4', '1d6', '1d8', '1d10', '1d12']),
  spellCastingAbility: faker.helpers.arrayElement([
    'intelligence',
    'wisdom',
    'charisma',
    null,
  ]),
})

export const mockCreateClassService = (): jest.Mocked<CreateClassService> => ({
  create: jest.fn(),
})
