import { faker } from '@faker-js/faker'
import { UpdateCharacterService, UpdateCharacterServiceParams } from '.'

export const mockUpdateCharacterServiceParams =
  (): UpdateCharacterServiceParams => ({
    data: {
      name: faker.person.jobTitle(),
    },
  })

export const mockUpdateCharacterService =
  (): jest.Mocked<UpdateCharacterService> => ({
    update: jest.fn(),
  })
