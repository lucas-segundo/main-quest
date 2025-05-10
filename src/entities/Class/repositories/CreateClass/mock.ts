import { faker } from '@faker-js/faker'
import { CreateClassRepository, CreateClassRepositoryParams } from '.'

export const mockCreateClassRepositoryParams =
  (): CreateClassRepositoryParams => ({
    name: faker.lorem.word(),
    hitDice: faker.helpers.arrayElement(['1d4', '1d6', '1d8', '1d10', '1d12']),
    spellCastingAbility: faker.helpers.arrayElement([
      'intelligence',
      'wisdom',
      'charisma',
      null,
    ]),
  })

export const mockCreateClassRepository =
  (): jest.Mocked<CreateClassRepository> => ({
    create: jest.fn(),
  })
