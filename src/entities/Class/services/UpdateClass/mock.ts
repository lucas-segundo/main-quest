import { faker } from '@faker-js/faker'
import { UpdateClassService, UpdateClassServiceParams } from '.'

export const mockUpdateClassServiceParams = (): UpdateClassServiceParams => ({
  data: {
    name: faker.person.jobTitle(),
  },
  include: {
    subclasses: faker.datatype.boolean(),
  },
})

export const mockUpdateClassService = (): jest.Mocked<UpdateClassService> => ({
  update: jest.fn(),
})
