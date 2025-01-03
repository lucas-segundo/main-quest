import { faker } from '@faker-js/faker'
import { UpdateClassRepository, UpdateClassRepositoryParams } from '.'

export const mockUpdateClassRepositoryParams =
  (): UpdateClassRepositoryParams => ({
    data: {
      name: faker.person.jobTitle(),
    },
    include: {
      subclasses: faker.datatype.boolean(),
    },
  })

export const mockUpdateClassRepository =
  (): jest.Mocked<UpdateClassRepository> => ({
    update: jest.fn(),
  })
