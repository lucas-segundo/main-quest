import { faker } from '@faker-js/faker'
import { UpdateSkillRepository, UpdateSkillRepositoryParams } from '.'

export const mockUpdateSkillRepositoryParams =
  (): UpdateSkillRepositoryParams => ({
    data: {
      name: faker.person.jobTitle(),
    },
  })

export const mockUpdateSkillRepository =
  (): jest.Mocked<UpdateSkillRepository> => ({
    update: jest.fn(),
  })
