import { faker } from '@faker-js/faker'
import { UpdateSubclassService, UpdateSubclassServiceParams } from '.'

export const mockUpdateSubclassServiceParams =
  (): UpdateSubclassServiceParams => ({
    data: {
      name: faker.person.jobTitle(),
    },
  })

export const mockUpdateSubclassService =
  (): jest.Mocked<UpdateSubclassService> => ({
    update: jest.fn(),
  })
