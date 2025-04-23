import { faker } from '@faker-js/faker'
import { UpdateSubclassRepository, UpdateSubclassRepositoryParams } from '.'

export const mockUpdateSubclassRepositoryParams =
  (): UpdateSubclassRepositoryParams => ({
    data: {
      name: faker.person.jobTitle(),
    },
  })

export const mockUpdateSubclassRepository =
  (): jest.Mocked<UpdateSubclassRepository> => ({
    update: jest.fn(),
  })
