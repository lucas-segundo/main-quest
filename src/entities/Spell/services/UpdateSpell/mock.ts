import { faker } from '@faker-js/faker'
import { UpdateSpellService, UpdateSpellServiceParams } from '.'

export const mockUpdateSpellServiceParams = (): UpdateSpellServiceParams => ({
  data: {
    name: faker.person.jobTitle(),
  },
})

export const mockUpdateSpellService = (): jest.Mocked<UpdateSpellService> => ({
  update: jest.fn(),
})
