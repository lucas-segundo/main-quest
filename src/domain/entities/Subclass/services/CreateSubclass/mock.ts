import { faker } from '@faker-js/faker'
import { CreateSubclassService, CreateSubclassServiceParams } from '.'

export const mockCreateSubclassServiceParams =
  (): CreateSubclassServiceParams => ({
    name: faker.commerce.productName(),
    classID: faker.string.uuid(),
  })

export const mockCreateSubclassService =
  (): jest.Mocked<CreateSubclassService> => ({
    create: jest.fn(),
  })
