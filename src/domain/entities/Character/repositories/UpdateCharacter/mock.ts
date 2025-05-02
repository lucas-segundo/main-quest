import { faker } from '@faker-js/faker'
import { UpdateCharacterRepository, UpdateCharacterRepositoryParams } from '.'

export const mockUpdateCharacterRepositoryParams =
  (): UpdateCharacterRepositoryParams => ({
    data: {
      name: faker.person.jobTitle(),
    },
  })

export const mockUpdateCharacterRepository =
  (): jest.Mocked<UpdateCharacterRepository> => ({
    update: jest.fn(),
  })
