import { faker } from '@faker-js/faker'
import { UpdateSpellRepository, UpdateSpellRepositoryParams } from '.'

export const mockUpdateSpellRepositoryParams =
  (): UpdateSpellRepositoryParams => ({
    data: {
      name: faker.person.jobTitle(),
    },
  })

export const mockUpdateSpellRepository =
  (): jest.Mocked<UpdateSpellRepository> => ({
    update: jest.fn(),
  })
