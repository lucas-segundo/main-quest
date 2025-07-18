import { faker } from '@faker-js/faker'
import { CreateSpellService, CreateSpellServiceParams } from '.'

export const mockCreateSpellServiceParams = (): CreateSpellServiceParams => ({
  name: faker.commerce.productName(),
})

export const mockCreateSpellService = (): jest.Mocked<CreateSpellService> => ({
  create: jest.fn(),
})
